package hu.readysoft.vcsbackend.modules.auth.role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);

    Boolean existsByName(String name);
}
