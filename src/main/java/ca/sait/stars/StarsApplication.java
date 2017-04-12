package ca.sait.stars;

import ca.sait.stars.domains.User;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Application entrance
 *
 * @author william
 *
 */
@SpringBootApplication
public class StarsApplication {

	/**
	 * main method to start embedded web server (Tomcat)
	 * 
	 * @param args
	 *            configurations. if there is no args, use default. args need to
	 *            follow the standard Spring Boot specified
	 */
	public static void main(String[] args) {
		SpringApplication.run(StarsApplication.class, args);
	}

	/**
	 * Initialize the data in database
	 *
	 * @author william
	 */
	@Configuration
	public class autoInit {

		/*
		 * can't use @Autowired CrudRepository<User, String> because spring will
		 * reuse UserRepository. Thus, the security constaints will be enforced,
		 * and cause failure to check AuthenticationObject in SecurityContext.
		 */
		@Autowired
		JdbcTemplate jdbcTemplate;

		@Value("${spring.profiles.active}")
		private String environment;

		@Value("${init.admin.create}")
		private String create;

		@Value("${init.admin.username}")
		private String username;

		@Value("${init.admin.firstname}")
		private String firstname;

		@Value("${init.admin.lastname}")
		private String lastname;

		@Value("${init.admin.email}")
		private String email;

		@Value("${init.admin.password}")
		private String password;

		@Value("${init.admin.sex}")
		private String sex;

		/**
		 * The first admin will be created during first time system startup
		 * under production environment. Under development environment, because
		 * the database (H2) is an in memory database and the data will loss
		 * during every restart, the admin will be created during every start.
		 */
		@PostConstruct
		public void initAdminUser() {

			if ("true".equalsIgnoreCase(create)) {
				switch (environment) {
				case "development":
					initAdminUnderDevelopment();
					break;
				case "production":
					initAdminUnderProduction();
					break;
				default:
					throw new RuntimeException(
							"No such profile, please check spring.profiles.active value in src/main/resources/application.properties. Velue allowed: \"production\", \"development\"");
				}
			}
		}

		/**
		 * initiate user under development environment
		 */
		private void initAdminUnderDevelopment() {
			User admin = instantiateAdmin();

			jdbcTemplate.update(
					"INSERT INTO stars_user(username, firstname, lastname, email, password, sex, is_admin, version, height, weight) VALUES (?,?,?,?,?,?,?,?,?,?)",
					admin.getUsername(), admin.getFirstname(), admin.getLastname(), admin.getEmail(),
					admin.getPassword(), admin.getSex().toString(), admin.getIsAdmin(), 1, 0, 0);
		}

		/**
		 * initiate user under production environment
		 */
		private void initAdminUnderProduction() {
			if (jdbcTemplate.queryForList("SELECT * FROM stars_user WHERE username = ?", username).isEmpty()) {
				User admin = instantiateAdmin();
				jdbcTemplate.update(
						"INSERT INTO stars_user(username, firstname, lastname, email, password, sex, is_admin, version, height, weight) VALUES (?,?,?,?,?,?,?,?,?,?)",
						admin.getUsername(), admin.getFirstname(), admin.getLastname(), admin.getEmail(),
						admin.getPassword(), admin.getSex().toString(), admin.getIsAdmin(), 1, 0, 0);
			}
		}

		/**
		 * This method reads configuration file and create a user
		 * 
		 * @return a User object
		 */
		private User instantiateAdmin() {
			User admin = new User();
			admin.setUsername(username);
			admin.setFirstname(firstname);
			admin.setLastname(lastname);
			admin.setAdmin(true);
			admin.setEmail(email);
			admin.setPassword(new BCryptPasswordEncoder().encode(password));

			switch (sex.toLowerCase()) {
			case "male":
				admin.setSex(User.Sex.Male);
				break;
			case "female":
				admin.setSex(User.Sex.Female);
				break;
			case "other":
				admin.setSex(User.Sex.Other);
				break;
			case "unknown":
				admin.setSex(User.Sex.Unknown);
				break;
			default:
				throw new RuntimeException(
						"No such sex predefined. Please use: \"male\", \"female\", \"other\", \"unknown\"");
			}

			return admin;
		}
	}
}
