package ca.sait.stars.domains;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the stars_model database table.
 * 
 * @author william
 *
 */
@Embeddable
public class ModelPK implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6641100107954248015L;

	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String make;

	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String type;

	public String getMake() {
		return this.make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ModelPK)) {
			return false;
		}
		ModelPK castOther = (ModelPK) other;
		return this.make.equals(castOther.make) && this.type.equals(castOther.type);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.make.hashCode();
		hash = hash * prime + this.type.hashCode();

		return hash;
	}

	@Override
	public String toString() {
		return make + "&" + type;
	}
}