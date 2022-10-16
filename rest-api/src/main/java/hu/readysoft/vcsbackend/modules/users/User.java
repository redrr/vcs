package hu.readysoft.vcsbackend.modules.users;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.modules.auth.role.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@FieldNameConstants
public class User extends BaseModel<User> {

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "id_card_num")
    private String idCardNumber;

    @Column(name = "birth_date")
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Override
    public String toString() {
        return Objects.nonNull(getFullName()) ? getFullName()+" ("+getUsername()+")" : getUsername();
    }

    @Override
    public void merge(User orig) {
        setFullName(Objects.isNull(getFullName()) ? orig.getFullName() : getFullName());
        setIdCardNumber(Objects.isNull(getIdCardNumber()) ? orig.getIdCardNumber() : getIdCardNumber());
        setBirthDate(Objects.isNull(getBirthDate()) ? orig.getBirthDate() : getBirthDate());
        setUsername(Objects.isNull(getUsername()) ? orig.getUsername() : getUsername());
        setEmail(Objects.isNull(getEmail()) ? orig.getEmail() : getEmail());
        setPassword(Objects.isNull(getPassword()) ? orig.getPassword() : getPassword());
        setRole(Objects.isNull(getRole()) ? orig.getRole() : getRole());
    }
}
