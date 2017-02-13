package ca.sait.stars.domains;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * The persistent class for the stars_user database table.
 * @author william
 *
 */
@Entity
@Table(name = "stars_user")
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3881890201970857506L;

	@Id
	@Column(unique = true, nullable = false, length = 30)
	private String username;

	@Column(length = 255)
	private String email;

	@Column(name = "is_admin", nullable = false)
	private boolean isAdmin;

	@Column(length = 60)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	// bi-directional many-to-one association to Record
	@OneToMany(cascade=CascadeType.REMOVE, mappedBy = "owner")
	private List<Record> records;

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

}