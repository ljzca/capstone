package ca.sait.stars.security.rules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.User;

/**
 * This class is for checking if user has enough privilege to set a specific
 * role
 *
 * @author william
 */
@Service
public class RoleCheck {

	@Autowired
	JdbcTemplate jdbcTemplate;

	/**
	 * Check if a caller has admin privilege to change a user's admin status
	 * 
	 * @param authentication
	 *            the Authentication information of the current request
	 * @param user
	 *            The user to be changed
	 * @return return true if the admin privilege operation being approved.
	 *         return false otherwise.
	 */
	public boolean checkRole(Authentication authentication, User user) {
		try {
			final SqlRowSet srs = jdbcTemplate.queryForRowSet("SELECT is_admin FROM stars_user WHERE username=?",
					authentication.getName());
			if (srs.next() && srs.getBoolean("is_admin"))
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
