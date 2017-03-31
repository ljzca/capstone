package ca.sait.stars;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import static ca.sait.stars.HttpRequestHelper.*;

import ca.sait.stars.domains.User;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = StarsApplication.class)
@WebAppConfiguration
public class UserTest {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private String userName = "bdussault";

	private List<User> userList = new ArrayList<>();

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
	}

	@Test
	public void createUser() throws Exception {
		String userJson = json(new User());
		System.out.println(this.getClass().getClassLoader().getResourceAsStream("/test/user.json").read());

		this.mockMvc.perform(post("/users").headers(getJsonHeader()).content(userJson)).andExpect(status().isCreated());
	}

	@Test
	public void getAllUsers() throws Exception {
		mockMvc.perform(get("http://localhost:8080/rest/users").headers(null)).andExpect(status().isForbidden());
	}

	@Test
	public void readSingleUser() throws Exception {
		mockMvc.perform(get("/" + userName + "/users/" + this.userList.get(0).getId())).andExpect(status().isOk())
				.andExpect(content().contentType(contentType))
				.andExpect(jsonPath("$.id", is(this.userList.get(0).getId())))
				.andExpect(jsonPath("$.uri", is("http://user.com/1/" + userName)))
				.andExpect(jsonPath("$.description", is("A description")));
	}

	@Test
	public void readUsers() throws Exception {
		mockMvc.perform(get("/" + userName + "/users")).andExpect(status().isOk())
				.andExpect(content().contentType(contentType)).andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].id", is(this.userList.get(0).getId())))
				.andExpect(jsonPath("$[0].uri", is("http://user.com/1/" + userName)))
				.andExpect(jsonPath("$[0].description", is("A description")))
				.andExpect(jsonPath("$[1].id", is(this.userList.get(1).getId())))
				.andExpect(jsonPath("$[1].uri", is("http://user.com/2/" + userName)))
				.andExpect(jsonPath("$[1].description", is("A description")));
	}

	private String json(User user) {
		return "{username:" + user.getUsername() + ","
				+ ""+"}";
	}
}
