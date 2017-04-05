package ca.sait.stars.domains;

import javax.persistence.*;

import java.util.List;

/**
 * The persistent class for the stars_record database table.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_record", uniqueConstraints = @UniqueConstraint(columnNames = { "owner", "title" }))
@NamedQuery(name = "Record.findAll", query = "SELECT r FROM Record r")
public class Record extends AbstractDomain<RecordPK> {

	private static final long serialVersionUID = -4417730453088600886L;

	@EmbeddedId
	private RecordPK id;

	@Lob
	private String description;

	// bi-directional many-to-one association to User
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner", nullable = false, insertable = false, updatable = false)
	private User owner;

	// bi-directional many-to-one association to RecordData
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "record")
	private List<RecordData> recordData;

	// bi-directional many-to-many association to Gear
	@ManyToMany
	@JoinTable(name = "stars_record_gear", joinColumns = {
			@JoinColumn(name = "record_owner", referencedColumnName = "owner", nullable = false),
			@JoinColumn(name = "title", referencedColumnName = "title", nullable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "name", referencedColumnName = "name", nullable = false),
					@JoinColumn(name = "type", referencedColumnName = "type", nullable = false),
					@JoinColumn(name = "gear_owner", referencedColumnName = "owner", nullable = false),
					@JoinColumn(name = "id", referencedColumnName = "id", nullable = false) })
	private List<Gear> gears;

	@Override
	public RecordPK getId() {
		return this.id;
	}

	public void setId(RecordPK id) {
		this.id = id;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getOwner() {
		return this.owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public List<RecordData> getRecordData() {
		return this.recordData;
	}

	public void setRecordData(List<RecordData> recordData) {
		this.recordData = recordData;
	}

	public RecordData addRecordData(RecordData recordData) {
		getRecordData().add(recordData);
		recordData.setRecord(this);

		return recordData;
	}

	public RecordData removeRecordData(RecordData recordData) {
		getRecordData().remove(recordData);
		recordData.setRecord(null);

		return recordData;
	}

	@Override
	public String toString() {
		return id.toString();
	}
}