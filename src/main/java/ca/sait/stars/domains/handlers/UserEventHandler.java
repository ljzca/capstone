package ca.sait.stars.domains.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.User;

/**
 * This class is used to encrypt the user password
 *
 * @author william
 */
@RepositoryEventHandler(User.class)
@Service
public class UserEventHandler {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * handle password update
     *
     * @param user
     */
    @HandleBeforeSave
    public void handleUserSave(User user) {
        System.out.println("enter save user, password: " + user.getPassword());
        // no password will just use the original password

        final SqlRowSet srs = jdbcTemplate.queryForRowSet("SELECT password FROM stars_user WHERE username=?", user.getUsername());

        if (user.getPassword() == null || user.getPassword().isEmpty() || !srs.next() || srs.getString("password").equals(user.getPassword())) {
            System.out.println("no password changes");
            return;
        }

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
    }

    /**
     * handle user creation
     *
     * @param user
     */
    @HandleBeforeCreate
    public void handleUserCreate(User user) {
        System.out.println("enter create user" + user.getPassword());
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

        // set default sex
        if (user.getSex() == null) {
            user.setSex(User.Sex.Unknown);
        }
    }
}
