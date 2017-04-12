package ca.sait.stars.domains;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * The persistent class for the stars_user database table.
 *
 * @author william
 *
 */
@Entity
@Table(name = "stars_user", uniqueConstraints = @UniqueConstraint(columnNames = { "username" }))
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User extends AbstractDomain<String> {

	private static final long serialVersionUID = 3881890201970857506L;

	/**
	 * username of the User
	 */
	@Id
	@Column(unique = true, nullable = false, length = 30)
	private String username;

	/**
	 * email address of the user
	 */
	@Column(length = 255, nullable = false)
	private String email;

	/**
	 * firstname of the user
	 */
	@Column(length = 30, nullable = false)
	private String firstname;

	/**
	 * lastname of the user
	 */
	@Column(length = 30, nullable = false)
	private String lastname;

	/**
	 * gender of the user
	 */
	@Column(name = "sex", nullable = false, length = 8)
	@Enumerated(EnumType.STRING)
	private Sex sex;

	/**
	 * predefined genders
	 * 
	 * @author 689626
	 *
	 */
	public enum Sex {
		Male, Female, Other, Unknown
	}

	/**
	 * centimeter
	 */
	@Column
	private double height;

	/**
	 * lbs
	 */
	@Column
	private double weight;

	/**
	 * whether or not an user is admin
	 */
	@Column(name = "is_admin", nullable = false)
	private boolean isAdmin;

	/**
	 * password is bcrypt hashed
	 */
	@Column(length = 60, nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	/**
	 * The records belong to the user
	 */
	// bi-directional many-to-one association to Record
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "owner")
	private List<Record> records;

	/**
	 * The gears a user has
	 */
	// bi-directional many-to-one association to Record
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "owner")
	private List<Gear> gears;

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public boolean getIsAdmin() {
		return this.isAdmin;
	}

	public void setIsAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Record> getRecords() {
		return this.records;
	}

	public void setRecords(List<Record> records) {
		this.records = records;
	}

	public List<Gear> getGears() {
		return gears;
	}

	public void setGears(List<Gear> gears) {
		this.gears = gears;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Record addRecord(Record record) {
		getRecords().add(record);
		record.setOwner(this);

		return record;
	}

	public Record removeRecord(Record record) {
		getRecords().remove(record);
		record.setOwner(null);

		return record;
	}

	@Override
	public String toString() {
		return username;
	}

	@Override
	public String getId() {
		return username;
	}
}
