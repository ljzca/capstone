package ca.sait.stars.security.rules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.User;

/**
 * This class is for checking if user has enough privilege to set a specific
 * role
 * 
 * @author william
 *
 */
@Service
public class RoleCheck {

    @Autowired
    private CrudRepository<User, String> ur;

    public boolean checkRole(Authentication authentication, User user) {
        try {
            User caller = ur.findOne(authentication.getName());
            if (caller.getIsAdmin())
                return true;
        } catch (Exception e) {
            // silent catch for non-login registration
        }

        /*
         * At this point, the caller is either recognized as a non-admin user,
         * or an anonymous registering user. Thus, if it intends to make itself
         * an admin, stop it.
         */
        return !user.getIsAdmin();
    }
}
