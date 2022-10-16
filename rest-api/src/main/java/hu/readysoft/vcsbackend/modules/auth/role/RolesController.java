package hu.readysoft.vcsbackend.modules.auth.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/roles")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RolesController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping(value = "/findall")
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}
