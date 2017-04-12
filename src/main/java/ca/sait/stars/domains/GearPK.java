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

	private static final long serialVersionUID = 6641100107954248015L;

	/**
	 * The name of the brand, which is the brand
	 */
	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String name;

	/**
	 * The type of the model, which is the model
	 */
	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String type;

	/**
	 * The username of the owner
	 */
	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String owner;

	/**
	 * The unique identifier of the gear. This property is added because one
	 * user can have more than one exact same gear (same model, same brand)
	 */
	@Column(nullable = false, insertable = false, updatable = false, length = 60)
	private String uuid;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((owner == null) ? 0 : owner.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		result = prime * result + ((uuid == null) ? 0 : uuid.hashCode());
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
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (owner == null) {
			if (other.owner != null)
				return false;
		} else if (!owner.equals(other.owner))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		if (uuid == null) {
			if (other.uuid != null)
				return false;
		} else if (!uuid.equals(other.uuid))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return name + "&" + type + "&" + owner + "&" + uuid;
	}
}