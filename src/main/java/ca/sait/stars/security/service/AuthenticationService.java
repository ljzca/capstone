package ca.sait.stars.security.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.User;

/**
 * This class provides user details from database (same as JDBCRealm is other
 * term)
 *
 * @author william
 *
 */
@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private CrudRepository<User, String> cr;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = cr.findOne(username);

        if (user == null) {
            throw new UsernameNotFoundException("username not found");
        }

        return new UserDetails() {

            private static final long serialVersionUID = 725882968690752981L;

            @Override
            public boolean isEnabled() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public String getUsername() {
                return user.getUsername();
            }

            @Override
            public String getPassword() {
                return user.getPassword();
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                Collection<GrantedAuthority> authoritys = new ArrayList<>();
                /*
                 * Although, the prefix 'ROLE_' is not specified in
                 * authorization declaration, it is implicitly added. So, the
                 * roles that returns need to have 'ROLE_' at front
                 */
                authoritys.add(new SimpleGrantedAuthority(user.getIsAdmin() ? "ROLE_ADMIN" : "ROLE_USER"));
                return authoritys;
            }
        };
    }
}
