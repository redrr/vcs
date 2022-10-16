package hu.readysoft.vcsbackend.modules.auth;

import hu.readysoft.vcsbackend.config.payload.request.DefaultRequest;
import hu.readysoft.vcsbackend.config.payload.request.LoginRequest;
import hu.readysoft.vcsbackend.config.payload.response.JwtResponse;
import hu.readysoft.vcsbackend.config.security.jwt.JwtUtils;
import hu.readysoft.vcsbackend.config.security.service.UserDetailsImpl;
import hu.readysoft.vcsbackend.modules.auth.role.Permission;
import hu.readysoft.vcsbackend.modules.users.User;
import hu.readysoft.vcsbackend.modules.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/checkpermission/{role}")
    public ResponseEntity<?> checkPrivilege(@RequestBody DefaultRequest request, @PathVariable String role) {
        try {
            Optional<User> userOptional = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(request.getToken()));
            return userOptional.map(user -> ResponseEntity.ok(userRepository.findByRole(user.getRole()).contains(Permission.valueOf(role))))
                    .orElseGet(() -> ResponseEntity.ok(false));
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/getpermissions")
    public ResponseEntity<List<Permission>> getPermissions(@RequestBody DefaultRequest request) {
        try {
            Optional<User> userOptional = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(request.getToken()));
            return userOptional.map(user -> ResponseEntity.ok(userRepository.findByRole(user.getRole()))).orElse(ResponseEntity.ok(Collections.emptyList()));
        } catch (Exception e) {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }
}
