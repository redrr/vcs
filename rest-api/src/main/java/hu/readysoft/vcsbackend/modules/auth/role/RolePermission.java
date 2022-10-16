package hu.readysoft.vcsbackend.modules.auth.role;

import hu.readysoft.vcsbackend.common.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.Optional;

@Entity
@Table(name = "role_permission")
@Getter
@Setter
@NoArgsConstructor
public class RolePermission extends BaseModel<RolePermission> {

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "permission")
    @Enumerated(EnumType.STRING)
    private Permission permission;

    @Override
    public void merge(RolePermission orig) {
        setRole(Objects.isNull(getRole()) ? orig.getRole() : getRole());
        setPermission(Objects.isNull(getPermission()) ? orig.getPermission() : getPermission());
    }
}
