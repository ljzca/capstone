package ca.sait.stars.domains;

import java.util.List;

public class User implements IDomain<String> {

	private String username;
	private String password;
	private String email;
	private boolean isAdmin;
	private List<Record> records;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public List<Record> getRecords() {
		return records;
	}

	public void setRecords(List<Record> records) {
		this.records = records;
	}

	// Not quite sure what to do with this method.

	@Override
	public String getId() {

		return username;
	}

}