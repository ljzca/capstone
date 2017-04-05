package ca.sait.stars.domains;

import java.io.Serializable;
//import java.util.Date;
import javax.persistence.*;

/**
 * The primary key class for the stars_record_data database table.
 * 
 * @author william
 *
 */
@Embeddable
public class RecordDataPK implements Serializable {

	private static final long serialVersionUID = -5143459958102680778L;

	/**
	 * The username of the owner
	 */
	@Column(nullable = false, insertable = false, updatable = false, length = 30)
	private String owner;

	/**
	 * The tile of the record
	 */
	@Column(nullable = false, insertable = false, updatable = false, length = 50)
	private String title;

	// @Temporal(TemporalType.TIMESTAMP)
	// @Column(nullable = false, insertable = false, updatable = false,
	// columnDefinition = "TIMESTAMP (6)")
	// private Date time;

	/*
	 * instead of storing a Date type, by storing a long type, the database can
	 * figure out foreign key constraint automatically
	 */
	/**
	 * This time is stored as a long value which represents the cumulative
	 * milliseconds since 00:00:00 January 1, 1970.
	 * 
	 * Conversion of this value in front end: JavaScript support instantiating
	 * Date prototype using new Date(milliseconds) to get a Date object. It has
	 * all date related functionalities to be handy.
	 * 
	 * Hardware wise, the time format is "yyyy-MM-ddTHH:mm:ssZ" where 'T' and
	 * 'Z' are just delimiters. As a possible future change, millisecond portion
	 * can be appended in a new format as "yyyy-MM-ddTHH:mm:ss:mmmZ"
	 */
	@Column(nullable = false, insertable = false, updatable = false)
	private long time;

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

	// public Date getTime() {
	// return this.time;
	// }
	//
	// public void setTime(Date time) {
	// this.time = time;
	// }

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	@Override
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof RecordDataPK)) {
			return false;
		}
		RecordDataPK castOther = (RecordDataPK) other;
		return this.owner.equals(castOther.owner) && this.title.equals(castOther.title) && this.time == castOther.time;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.owner.hashCode();
		hash = hash * prime + this.title.hashCode();
		hash = hash * prime + (int) this.time;

		return hash;
	}

	@Override
	public String toString() {
		return owner + "&" + title + "&" + time;
	}
}