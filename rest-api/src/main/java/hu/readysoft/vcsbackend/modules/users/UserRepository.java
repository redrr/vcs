package hu.readysoft.vcsbackend.modules.users;

import hu.readysoft.vcsbackend.modules.auth.role.Permission;
import hu.readysoft.vcsbackend.modules.auth.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("select rr.permission from RolePermission rr " +
            "where rr.role = :role")
    List<Permission> findByRole(Role role);
}
