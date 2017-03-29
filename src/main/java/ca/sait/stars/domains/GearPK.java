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
public class GearPK implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6641100107954248015L;

	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String make;

	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String type;

	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String owner;

	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

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

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((make == null) ? 0 : make.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		result = prime * result + ((owner == null) ? 0 : owner.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GearPK other = (GearPK) obj;
		if (id != other.id)
			return false;
		if (make == null) {
			if (other.make != null)
				return false;
		} else if (!make.equals(other.make))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		if (owner == null) {
			if (other.owner != null)
				return false;
		} else if (!owner.equals(other.owner))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return make + "&" + type + "&" + owner + "&" + id;
	}
}