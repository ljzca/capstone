package ca.sait.stars.components;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import org.springframework.stereotype.Component;

@Component
public class Encoding {
	
	private static final String CHARSET = "UTF-8";

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
