package ca.sait.stars.security.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This class provides user details from database (same as JDBCRealm is other
 * term)
 *
 * @author william
 */
@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

        final SqlRowSet srs = jdbcTemplate.queryForRowSet("SELECT password, is_admin FROM stars_user WHERE username=?", username);

        if (!srs.next())
            throw new UsernameNotFoundException("username not found");

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
                return username;
            }

            @Override
            public String getPassword() {
                return srs.getString("password");
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                Collection<GrantedAuthority> authoritys = new ArrayList<>();
                /*
                 * Although, the prefix 'ROLE_' is not specified in
                 * authorization declaration, it is implicitly added. So, the
                 * roles that returns need to have 'ROLE_' at front
                 */
                authoritys.add(new SimpleGrantedAuthority(srs.getBoolean("is_admin") ? "ROLE_ADMIN" : "ROLE_USER"));
                return authoritys;
            }
        };
    }
}
