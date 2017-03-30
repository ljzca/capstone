package ca.sait.stars;

import java.nio.charset.Charset;
import java.util.Base64;

import org.junit.Ignore;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

/**
 * This is a helper class to add different headers of an http request
 * 
 * @author 689626
 *
 */
@Ignore
public class HttpRequestHelper {

	public static HttpHeaders getBasicAuthAdminHeader() {
		return new ChainedHttpHeader(getJsonHeader())
				.add(HttpHeaders.AUTHORIZATION,
						getBasicAuthValue("admin", "password"))
				.get();
	}

	public static HttpHeaders getBasicAuthUserHeader() {
		return new ChainedHttpHeader(getJsonHeader())
				.add(HttpHeaders.AUTHORIZATION,
						getBasicAuthValue("user", "password"))
				.get();
	}

	public static HttpHeaders getJsonHeader() {
		return new ChainedHttpHeader().add(HttpHeaders.CONTENT_TYPE, new MediaType(MediaType.APPLICATION_JSON.getType(),
					MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8")).toString())
				.get();
	}

	private static String getBasicAuthValue(String username, String password) {
		return "Basic " + new String(Base64.getEncoder().encode((username + ":" + password).getBytes()));
	}
}
