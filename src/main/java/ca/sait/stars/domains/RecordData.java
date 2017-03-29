package ca.sait.stars.domains;

import javax.persistence.*;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The persistent class for the stars_record_data database table.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_record_data", uniqueConstraints = @UniqueConstraint(columnNames = { "owner", "title", "time" }))
@NamedQuery(name = "RecordData.findAll", query = "SELECT r FROM RecordData r")
public class RecordData implements Persistable<RecordDataPK> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2179632862300221506L;

	@EmbeddedId
	private RecordDataPK id;

	@Column(nullable = false)
	private double cacc;

	@Column(nullable = false)
	private double gpsfix;

	@Column(nullable = false)
	private double hacc;

	@Column(nullable = false)
	private double hmsl;

	@Column(nullable = false)
	private double heading;

	@Column(nullable = false)
	private double lat;

	@Column(nullable = false)
	private double lon;

	@Column(nullable = false)
	private double numsv;

	@Column(nullable = false)
	private double sacc;

	@Column(nullable = false)
	private double vacc;

	@Column(nullable = false)
	private double veld;

	@Column(nullable = false)
	private double vele;

	@Column(nullable = false)
	private double veln;

	/**
	 * Celsius
	 */
	@Column(nullable = false)
	private double temp;

	@Version
	@JsonIgnore
	private Long version;

	// bi-directional many-to-one association to Record
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({
			@JoinColumn(name = "owner", referencedColumnName = "owner", nullable = false, insertable = false, updatable = false),
			@JoinColumn(name = "title", referencedColumnName = "title", nullable = false, insertable = false, updatable = false) })
	private Record record;

	@Override
	public RecordDataPK getId() {
		return this.id;
	}

	public void setId(RecordDataPK id) {
		this.id = id;
	}

	public double getCacc() {
		return cacc;
	}

	public void setCacc(double cacc) {
		this.cacc = cacc;
	}

	public double getGpsfix() {
		return gpsfix;
	}

	public void setGpsfix(double gpsfix) {
		this.gpsfix = gpsfix;
	}

	public double getHacc() {
		return hacc;
	}

	public void setHacc(double hacc) {
		this.hacc = hacc;
	}

	public double getHmsl() {
		return hmsl;
	}

	public void setHmsl(double hmsl) {
		this.hmsl = hmsl;
	}

	public double getHeading() {
		return heading;
	}

	public void setHeading(double heading) {
		this.heading = heading;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getNumsv() {
		return numsv;
	}

	public void setNumsv(double numsv) {
		this.numsv = numsv;
	}

	public double getSacc() {
		return sacc;
	}

	public void setSacc(double sacc) {
		this.sacc = sacc;
	}

	public double getVacc() {
		return vacc;
	}

	public void setVacc(double vacc) {
		this.vacc = vacc;
	}

	public double getVeld() {
		return veld;
	}

	public void setVeld(double veld) {
		this.veld = veld;
	}

	public double getVele() {
		return vele;
	}

	public void setVele(double vele) {
		this.vele = vele;
	}

	public double getVeln() {
		return veln;
	}

	public void setVeln(double veln) {
		this.veln = veln;
	}

	public double getTemp() {
		return temp;
	}

	public void setTemp(double temp) {
		this.temp = temp;
	}

	public Record getRecord() {
		return this.record;
	}

	public void setRecord(Record record) {
		this.record = record;
	}

	@Override
	public String toString() {
		return id.toString();
	}

	@Override
	public boolean isNew() {
		return version == null;
	}

}