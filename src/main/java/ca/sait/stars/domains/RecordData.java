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
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private double pitch;

    @Column(nullable = false)
    private double yaw;

    @Column(nullable = false)
    private double roll;

    /**
     * ground velocity
     */
    @Column(nullable = false)
    private double gvelocity;

    /**
     * vertical velocity
     */
    @Column(nullable = false)
    private double vvelocity;

    /**
     * flight velocity
     */
    @Column(nullable = false)
    private double fvelocity;

    /**
     * x axis accelerate
     */
    @Column(nullable = false)
    private double xaccel;

    /**
     * y axis accelerate
     */
    @Column(nullable = false)
    private double yaccel;

    /**
     * z axis accelerate
     */
    @Column(nullable = false)
    private double zaccel;

    /**
     * angle of attack
     */
    @Column(nullable = false)
    private double aoa;

    /**
     * glide ratio
     */
    @Column(nullable = false)
    private double gratio;

    /**
     * Celsius
     */
    @Column(nullable = false)
    private double temperature;
    
    /**
     * degree
     */
    @Column(nullable = false)
    private double heading;

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

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getPitch() {
        return pitch;
    }

    public void setPitch(double pitch) {
        this.pitch = pitch;
    }

    public double getYaw() {
        return yaw;
    }

    public void setYaw(double yaw) {
        this.yaw = yaw;
    }

    public double getRoll() {
        return roll;
    }

    public void setRoll(double roll) {
        this.roll = roll;
    }

    public double getGvelocity() {
        return gvelocity;
    }

    public void setGvelocity(double gvelocity) {
        this.gvelocity = gvelocity;
    }

    public double getVvelocity() {
        return vvelocity;
    }

    public void setVvelocity(double vvelocity) {
        this.vvelocity = vvelocity;
    }

    public double getFvelocity() {
        return fvelocity;
    }

    public void setFvelocity(double fvelocity) {
        this.fvelocity = fvelocity;
    }

    public double getXaccel() {
        return xaccel;
    }

    public void setXaccel(double xaccel) {
        this.xaccel = xaccel;
    }

    public double getYaccel() {
        return yaccel;
    }

    public void setYaccel(double yaccel) {
        this.yaccel = yaccel;
    }

    public double getZaccel() {
        return zaccel;
    }

    public void setZaccel(double zaccel) {
        this.zaccel = zaccel;
    }

    public double getAoa() {
        return aoa;
    }

    public void setAoa(double aoa) {
        this.aoa = aoa;
    }

    public double getGratio() {
        return gratio;
    }

    public void setGratio(double gratio) {
        this.gratio = gratio;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHeading() {
		return heading;
	}

	public void setHeading(double heading) {
		this.heading = heading;
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