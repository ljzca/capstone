package ca.sait.stars.domains;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 * The primary key class for the stars_record_data database table.
 * 
 */
@Embeddable
public class RecordDataPK implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5143459958102680778L;

	@Column(nullable = false, length = 30)
	private String owner;

	@Column(nullable = false, length = 255)
	private String title;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date time;

	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getTime() {
		return this.time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof RecordDataPK)) {
			return false;
		}
		RecordDataPK castOther = (RecordDataPK) other;
		return this.owner.equals(castOther.owner) && this.title.equals(castOther.title)
				&& this.time.equals(castOther.time);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.owner.hashCode();
		hash = hash * prime + this.title.hashCode();
		hash = hash * prime + this.time.hashCode();

		return hash;
	}

	@Override
	public String toString() {
		return owner + "&" + title + "&" + time.getTime();
	}
}