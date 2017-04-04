package ca.sait.stars;

import org.junit.Ignore;
import org.springframework.http.HttpHeaders;

/**
 * This is a wrapper class of HttpHeader to make it chainable
 * 
 * @author William Li
 *
 */
@Ignore
public class ChainedHttpHeader {
	private HttpHeaders hh;

	public ChainedHttpHeader() {
		hh = new HttpHeaders();
	}

	public ChainedHttpHeader(HttpHeaders hh) {
		this.hh = hh;
	}

	public ChainedHttpHeader add(String headerName, String headerValue) {
		hh.add(headerName, headerValue);
		return this;
	}

	public HttpHeaders get() {
		return hh;
	}
}