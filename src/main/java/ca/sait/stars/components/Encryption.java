package ca.sait.stars.components;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Encryption {

	private static final String ALGORITHM = "SHA-256";

	@Autowired
	private Encoding encode;

	public String encrypt(String data) {
		try {
			MessageDigest md = MessageDigest.getInstance(ALGORITHM);
			md.update(data.getBytes());
			return encode.base64encoding(md.digest());
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}
}