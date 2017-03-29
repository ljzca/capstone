package ca.sait.stars;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import ca.sait.stars.domains.User;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = StarsApplication.class)
@WebAppConfiguration
public class StarsApplicationTests {

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private String userName = "bdussault";

	private HttpMessageConverter<User> mappingJackson2HttpMessageConverter;

	private List<User> userList = new ArrayList<>();

	@Autowired
	private WebApplicationContext webApplicationContext;

	// @Autowired
	// void setConverters(HttpMessageConverter<?>[] converters) {
	//
	// this.mappingJackson2HttpMessageConverter =
	// Arrays.asList(converters).stream()
	// .filter(hmc -> hmc instanceof
	// MappingJackson2HttpMessageConverter).findAny().orElse(null);
	//
	// assertNotNull("the JSON message converter must not be null",
	// this.mappingJackson2HttpMessageConverter);
	// }

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
	}

	@Test
	public void userNotFound() throws Exception {
		mockMvc.perform(get("localhost:8080/rest/users/")/*.content(this.json(new User()))*/.contentType(contentType))
				.andExpect(status().isForbidden());
	}

	@Test
	public void readSingleUser() throws Exception {
		mockMvc.perform(get("/" + userName + "/users/" + this.userList.get(0).getId()))
				.andExpect(status().isOk()).andExpect(content().contentType(contentType))
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

	@Test
	public void createUser() throws Exception {
		String userJson = json(new User());

		this.mockMvc.perform(post("/" + userName + "/users").contentType(contentType).content(userJson))
				.andExpect(status().isCreated());
	}

	protected String json(User o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}
}
