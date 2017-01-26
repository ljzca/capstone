package ca.sait.stars.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
	        .sessionManagement()
	        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
	        .authorizeRequests()
	        .antMatchers("/users/**").authenticated()
        .and()
	        .httpBasic()
	        .realmName("Secure api")
        .and()
	        .csrf()
	        .disable();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("will").password("password").roles("USER").and()
			.withUser("admin").password("password").roles("USER", "ADMIN");
	}
}