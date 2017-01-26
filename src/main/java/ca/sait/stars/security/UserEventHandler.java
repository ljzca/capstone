package ca.sait.stars.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import ca.sait.stars.domains.User;
import ca.sait.stars.utils.EncryptionUtils;

/**
 * This class is used to encrypt the user password
 * 
 * @author william
 *
 */
@RepositoryEventHandler(User.class)
@Component
public class UserEventHandler {

	@Autowired
	private EncryptionUtils eu;

	/**
	 * handle password update
	 * 
	 * @param user
	 */
	@HandleBeforeSave
	public void handleUserSave(User user) {
		if (user.getPassword() == null || user.getPassword().isEmpty())
			return;

		encryptPassword(user);
	}

	/**
	 * handle user creation
	 * 
	 * @param user
	 */
	@HandleBeforeCreate
	public void handleUserCreate(User user) {
		encryptPassword(user);
	}

	/**
	 * encrypt password for the user
	 * 
	 * @param user
	 */
	private void encryptPassword(User user) {
		user.setPassword(eu.encrypt(user.getPassword()));
	}

}