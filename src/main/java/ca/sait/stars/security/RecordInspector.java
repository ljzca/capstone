package ca.sait.stars.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import ca.sait.stars.domains.Record;
import ca.sait.stars.repositories.UserRepository;

/**
 * This class deals with content accessibility of records
 * 
 * @author william
 *
 */
@Component
public class RecordInspector {

	@Autowired
	private UserRepository ur;

	/**
	 * Check if the record id belongs to the logged in user
	 * 
	 * @param authentication
	 *            contains information about the logged in user
	 * @param id
	 *            record id the user want to access
	 * @return true if the record belongs the user, false otherwise
	 */
	public boolean checkOwnership(Authentication authentication, int id) {
//		try {
//			for (Record record : ur.findOne(authentication.getName()).getRecords())
//				if (record.getRecordId().intValue() == id)
//					return true;
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
		return false;
	}
}
