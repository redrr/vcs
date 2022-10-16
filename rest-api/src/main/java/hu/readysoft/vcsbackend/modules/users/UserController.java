package hu.readysoft.vcsbackend.modules.users;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.common.RestUIBuilder;
import hu.readysoft.vcsbackend.common.table.FilterType;
import hu.readysoft.vcsbackend.common.table.TableBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController extends RestUIBuilder<User, UserRepository> {

    @Override
    public Class<User> getModelClass() {
        return User.class;
    }

    @Override
    public TableBuilder dataTableUI() {
        return new TableBuilder()
                .column(BaseModel.Fields.id)
                .column(User.Fields.username, FilterType.LIKE)
                .column(User.Fields.fullName, FilterType.LIKE)
                .column(User.Fields.email, FilterType.LIKE)
                .column(User.Fields.idCardNumber, FilterType.LIKE)
                .column(User.Fields.birthDate, FilterType.BETWEEN)
                .column(User.Fields.role, FilterType.LIKE);
    }
}
