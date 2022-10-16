package hu.readysoft.vcsbackend.modules.auth.role;

import hu.readysoft.vcsbackend.common.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "role")
@Getter
@Setter
@NoArgsConstructor
public class Role extends BaseModel<Role> {

    @Column(name = "name")
    private String name;

    @Override
    public String toString() {
        return name;
    }


    @Override
    public void merge(Role orig) {
        setName(Objects.isNull(getName()) ? orig.getName() : getName());
    }
}
