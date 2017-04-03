package ca.sait.stars.security.entries;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * An entry of web client
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
        // getRealmName() + "\""); // by adding this header, the browser will
        // prompt user to enter username and password
        // response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        // response.getWriter().println("HTTP Status 401 - " +
        // authException.getMessage());

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
}
