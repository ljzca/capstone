package ca.sait.stars.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Service;

import ca.sait.stars.components.Encryption;
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

	@Autowired
	private Encryption eu;

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