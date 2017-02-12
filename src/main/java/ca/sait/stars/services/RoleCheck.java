package ca.sait.stars.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.User;

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

		return user.getIsAdmin() ? false : true;
	}
}
