package hu.readysoft.vcsbackend.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.readysoft.vcsbackend.common.table.FilterType;
import hu.readysoft.vcsbackend.common.table.TableBuilder;
import hu.readysoft.vcsbackend.config.security.jwt.JwtUtils;
import hu.readysoft.vcsbackend.modules.users.User;
import hu.readysoft.vcsbackend.modules.users.UserRepository;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.criteria.*;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
public abstract class RestUIBuilder<T extends BaseModel, N extends CrudRepository<T, Integer>> {

    @Autowired
    private BaseService service;

    @Autowired
    @Getter
    private N repository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    public abstract Class<T> getModelClass();

    public abstract TableBuilder dataTableUI();

    public Predicate staticFilter(CriteriaBuilder cb, Root<T> root, User username) {
        return null;
    }

    @PostMapping(value = "/data")
    public String getTable(@RequestBody String json) {
        JSONObject request = new JSONObject(json);
        int page = request.getInt("draw");
        int start = request.getInt("start");
        int records = request.getInt("length");
        JSONArray columns = request.getJSONArray("columns");

        CriteriaBuilder cb = service.getEntityManager().getCriteriaBuilder();
        CriteriaQuery<T> baseQuery = cb.createQuery(getModelClass());
        CriteriaQuery<T> query = cb.createQuery(getModelClass());
        Root<T> baseRoot = baseQuery.from(getModelClass());
        Root<T> root = query.from(getModelClass());

        List<Predicate> filterList = new ArrayList<>();
        userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(request.getString("token"))).ifPresent(user -> {
            Predicate staticFilter = staticFilter(cb, root, user);
            if (Objects.nonNull(staticFilter)) {
                filterList.add(staticFilter);
            }        });
        for (int i = 0; i < columns.length(); i++) {
            JSONObject column = columns.getJSONObject(i);
            JSONObject search = column.getJSONObject("search");
            String filterValue = search.getString("value");
            if (!"".equals(filterValue)) {
                String data = column.getString("data").substring(1);
                FilterType type = dataTableUI().build().getOrDefault(data, FilterType.EQUAL);
                if (FilterType.LIKE.equals(type)) {
                    filterList.add(cb.like(cb.upper(root.get(data)), "%".concat(filterValue.toUpperCase()).concat("%")));
                } else if (FilterType.EQUAL.equals(type)) {
                    if (filterValue.contains("&&")) {
                        filterList.add(root.get(data).in(filterValue.split("&&")));
                    } else {
                        filterList.add(cb.equal(root.get(data), filterValue));
                    }
                } else if (FilterType.BETWEEN.equals(type)) {
                    if (filterValue.contains(" to ")) {
                        String[] dates = filterValue.split(" to ");
                        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
                        try {
                            filterList.add(cb.between(root.get(data), dateFormatter.parse(dates[0]), dateFormatter.parse(dates[1])));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                } else if (FilterType.GREATER.equals(type)) {
                    filterList.add(cb.greaterThan(root.get(data), filterValue));
                } else if (FilterType.GREATER_OR_EQUAL.equals(type)) {
                    filterList.add(cb.greaterThanOrEqualTo(root.get(data), filterValue));
                } else if (FilterType.LESS.equals(type)) {
                    filterList.add(cb.lessThan(root.get(data), filterValue));
                } else if (FilterType.LESS_OR_EQUAL.equals(type)) {
                    filterList.add(cb.lessThanOrEqualTo(root.get(data), filterValue));
                }
            }
        }

        JSONArray orders = request.getJSONArray("order");
        List<Order> orderList = new ArrayList<>();
        for (int i = 0; i < orders.length(); i++) {
            JSONObject ord = orders.getJSONObject(i);
            JSONObject col = columns.getJSONObject(ord.getInt("column"));
            String field = col.getString("data").substring(1);
            if ("asc".equalsIgnoreCase(ord.getString("dir"))) {
                orderList.add(cb.asc(root.get(field)));
            } else {
                orderList.add(cb.desc(root.get(field)));
            }
        }
        query.select(root).where(filterList.toArray(new Predicate[]{})).orderBy(orderList);

        int allCount = service.getEntityManager().createQuery(baseQuery.select(baseRoot)).getResultList().size();
        int count = service.getEntityManager().createQuery(query).getResultList().size();
        List<T> all = service.getEntityManager().createQuery(query).setFirstResult(start).setMaxResults(records).getResultList();

        JSONObject result = new JSONObject();
        result.put("draw", page);
        result.put("recordsTotal", allCount);
        result.put("recordsFiltered", count);
        JSONArray array = new JSONArray();
        all.forEach(attr -> {
            JSONObject object = new JSONObject();
            List<Method> methods = new ArrayList<>();
            methods.addAll(Arrays.asList(attr.getClass().getDeclaredMethods()));
            methods.addAll(Arrays.asList(attr.getClass().getSuperclass().getDeclaredMethods()));
            dataTableUI().build().keySet().forEach(f -> {
                try {
                    for (Method method : methods) {
                        if (method.getName().equalsIgnoreCase("get".concat(f))) {
                            object.put("_".concat(f), Objects.toString(method.invoke(attr), ""));
                        }
                    }
                } catch (Exception e) {
                    log.warn("A megadott field névhez nem található getter", f);
                }
            });
            array.put(object);
        });
        result.put("data", array);
        return result.toString();
    }

    @GetMapping(value = "/data/{column}")
    public String getEnumFilter(@PathVariable String column) {
        JSONArray array = new JSONArray();
        if (!"".equals(column)) {
            CriteriaBuilder cb = service.getEntityManager().getCriteriaBuilder();
            CriteriaQuery<T> baseQuery = cb.createQuery(getModelClass());
            CriteriaQuery<T> query = cb.createQuery(getModelClass());
            Root<T> root = query.from(getModelClass());

            String cData = column.substring(1);
            query.select(root.get(cData)).distinct(true);
            array.putAll(service.getEntityManager().createQuery(query).getResultList());
        }
        return array.toString();
    }

    @GetMapping(value = "/findall")
    public Iterable<T> findAll() {
        return repository.findAll();
    }

    @GetMapping(value = "find/{id}")
    public ResponseEntity<T> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(repository.findById(id).orElse(null));
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody String data) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            T entity = mapper.readValue(data, getModelClass());
            if (Objects.nonNull(entity.getId())) {
                Optional<T> optionalEntity = repository.findById(entity.getId());
                if (optionalEntity.isPresent()) {
                    entity.merge(optionalEntity.get());
                }
            }
            repository.save(entity);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            log.error("Hiba az entitás mentése során", e);
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            Optional<T> entityOptional = repository.findById(id);
            if (entityOptional.isPresent()) {
                repository.delete(entityOptional.get());
                return ResponseEntity.ok(true);
            }
        } catch (Exception e) {
            log.error("Hiba az entitás mentése során", e);
        }
        return ResponseEntity.ok(false);
    }


}
