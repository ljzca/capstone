package ca.sait.stars.domains;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the stars_record_data database table.
 * 
 */
@Entity
@Table(name = "stars_record_data", uniqueConstraints = @UniqueConstraint(columnNames = { "owner", "title", "time" }))
@NamedQuery(name = "RecordData.findAll", query = "SELECT r FROM RecordData r")
public class RecordData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2179632862300221506L;

	@EmbeddedId
	private RecordDataPK id;

	@Column(name = "c_acc", nullable = false)
	private double cAcc;

	@Column(name = "gps_fix", nullable = false)
	private double gpsFix;

	@Column(name = "h_acc", nullable = false)
	private double hAcc;

	@Column(name = "h_m_s_l", nullable = false)
	private double hMSL;

	@Column(nullable = false)
	private double heading;

	@Column(nullable = false)
	private double lat;

	@Column(nullable = false)
	private double lon;

	@Column(name = "num_s_v", nullable = false)
	private double numSV;

	@Column(name = "s_acc", nullable = false)
	private double sAcc;

	@Column(name = "v_acc", nullable = false)
	private double vAcc;

	@Column(name = "vel_d", nullable = false)
	private double velD;

	@Column(name = "vel_e", nullable = false)
	private double velE;

	@Column(name = "vel_n", nullable = false)
	private double velN;

	// bi-directional many-to-one association to Record
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({
			@JoinColumn(name = "owner", referencedColumnName = "owner", nullable = false, insertable = false, updatable = false),
			@JoinColumn(name = "title", referencedColumnName = "title", nullable = false, insertable = false, updatable = false) })
	private Record record;

	public RecordDataPK getId() {
		return this.id;
	}

	public void setId(RecordDataPK id) {
		this.id = id;
	}

	public double getCAcc() {
		return this.cAcc;
	}

	public void setCAcc(double cAcc) {
		this.cAcc = cAcc;
	}

	public double getGpsFix() {
		return this.gpsFix;
	}

	public void setGpsFix(double gpsFix) {
		this.gpsFix = gpsFix;
	}

	public double getHAcc() {
		return this.hAcc;
	}

	public void setHAcc(double hAcc) {
		this.hAcc = hAcc;
	}

	public double getHMSL() {
		return this.hMSL;
	}

	public void setHMSL(double hMSL) {
		this.hMSL = hMSL;
	}

	public double getHeading() {
		return this.heading;
	}

	public void setHeading(double heading) {
		this.heading = heading;
	}

	public double getLat() {
		return this.lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return this.lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getNumSV() {
		return this.numSV;
	}

	public void setNumSV(double numSV) {
		this.numSV = numSV;
	}

	public double getSAcc() {
		return this.sAcc;
	}

	public void setSAcc(double sAcc) {
		this.sAcc = sAcc;
	}

	public double getVAcc() {
		return this.vAcc;
	}

	public void setVAcc(double vAcc) {
		this.vAcc = vAcc;
	}

	public double getVelD() {
		return this.velD;
	}

	public void setVelD(double velD) {
		this.velD = velD;
	}

	public double getVelE() {
		return this.velE;
	}

	public void setVelE(double velE) {
		this.velE = velE;
	}

	public double getVelN() {
		return this.velN;
	}

	public void setVelN(double velN) {
		this.velN = velN;
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

}