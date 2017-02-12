package ca.sait.stars.services;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.User;

/**
 * This class is used to encrypt the user password
 * 
 * @author william
 *
 */
@RepositoryEventHandler(User.class)
@Service
public class UserEventHandler {
	
	/**
	 * handle password update
	 * 
	 * @param user
	 */
	@HandleBeforeSave
	public void handleUserSave(User user) {
		if (user.getPassword() == null || user.getPassword().isEmpty())
			return;
		
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
	}

	/**
	 * handle user creation
	 * 
	 * @param user
	 */
	@HandleBeforeCreate
	public void handleUserCreate(User user) {

		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
	}
}