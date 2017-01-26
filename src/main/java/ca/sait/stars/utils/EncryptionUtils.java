package ca.sait.stars.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import org.springframework.stereotype.Component;

@Component
public class EncryptionUtils {

	private static final String ALGORITHM = "SHA-256";
	private static final String CHARSET = "UTF-8";

	public String encrypt(String data) {
		try {
			MessageDigest md = MessageDigest.getInstance(ALGORITHM);
			md.update(data.getBytes());
			return base64encoding(md.digest());
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

	public String base64encoding(byte[] bytes) {
		Encoder encoder = Base64.getEncoder();
		return encoder.encodeToString(bytes);
	}

	public String base64decoding(String data) {
		try {
			Decoder decoder = Base64.getDecoder();
			return new String(decoder.decode(data), CHARSET);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
}