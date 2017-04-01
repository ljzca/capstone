package ca.sait.stars;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import static ca.sait.stars.HttpRequestHelper.*;

@RunWith(SpringRunner.class)
/*
 * WebEnvironment.DEFINED_PORT Makes test to run on a real servlet environment
 * (http://docs.spring.io/spring-boot/docs/1.5.1.RELEASE/reference/html/boot-
 * features-testing.html#boot-features-testing-spring-applications)
 */
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class UserTest {

	private MockMvc mockMvc;

	@Autowired
	private ResourceReader rr;

	@Autowired
	private WebApplicationContext webApplicationContext;

	/*
	 * This is used to enable filters (thus, it enables security test)
	 */
	@Autowired
	private FilterChainProxy filterChainProxy;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.mockMvc = webAppContextSetup(webApplicationContext).dispatchOptions(true).addFilters(filterChainProxy)
				.build();
	}

	@Test
	public void createUser() throws Exception {
		this.mockMvc.perform(post("/rest/users").headers(getJsonHeader()).content(rr.readFromTest("user.json")))
				.andExpect(status().isCreated());
	}

	@Test
	public void getAllUsers() throws Exception {
		mockMvc.perform(get("/rest/users").headers(getBasicAuthAdminHeader())).andExpect(status().isOk());
	}

}
