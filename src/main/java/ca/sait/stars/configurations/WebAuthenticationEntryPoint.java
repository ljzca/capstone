package ca.sait.stars.configurations;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * I have to commit that to change status code to 403 (instead of 401) might not
 * be the best way to prevent browser from prompting the basic authentication
 * popup. But it works for the Angular front end.
 * 
 * @author William Li
 *
 */
@Component
public class WebAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

	@Override
	public void afterPropertiesSet() throws Exception {
		setRealmName("S.T.A.R.S");
		super.afterPropertiesSet();
	}

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// response.addHeader("WWW-Authenticate", "Basic realm=\"" +
		// getRealmName() + "\"");
		// response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		// response.getWriter().println("HTTP Status 401 - " +
		// authException.getMessage());

		response.addHeader("WWW-Authenticate", "Basic realm=\"" + getRealmName() + "\"");
		response.sendError(HttpServletResponse.SC_FORBIDDEN, authException.getMessage());
	}
}
