package ca.sait.stars.security.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

/**
 * Global security setting
 * 
 * @author william
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationEntryPoint webAuthenticationEntryPoint;
    
    @Value("${spring.profiles.active}")
    private String environment;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        
        http
//            // To enable password encoder, this won't work
//            .userDetailsService(userDetailsService)
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .httpBasic()
            .authenticationEntryPoint(webAuthenticationEntryPoint)
        .and()
            .csrf()
            .disable()
        ;

        /*
         * to make H2 database console displayed
         */
        if("development".equals(environment))
            http.headers().frameOptions().sameOrigin();
    }

    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth)
        throws Exception {

        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(new BCryptPasswordEncoder())
        ;
        
        /*
         * this is how to make inMemory users. Note: no "ROLE_" as a prefix of the role "ROLE_ADMIN", instead, just use "ADMIN"
         */
//        auth
//            .inMemoryAuthentication()
//                .withUser("admin")
//                .password("password")
//                .roles("ADMIN")
//            .and()
//                .withUser("user")
//                .password("password")
//        ;
    }
}