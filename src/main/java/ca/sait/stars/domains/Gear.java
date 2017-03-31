package ca.sait.stars.domains;

import java.util.List;

import javax.persistence.*;
import static javax.persistence.CascadeType.*;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The persistent class for the stars_gear database table.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_gear", uniqueConstraints = @UniqueConstraint(columnNames = { "name", "type", "owner", "id" }))
@NamedQuery(name = "Gear.findAll", query = "SELECT g FROM Gear g")
public class Gear implements Persistable<GearPK> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3881890201970857506L;

	@EmbeddedId
	private GearPK id;

	@Lob
	private String description;

	@Version
	@JsonIgnore
	private Long version;

	// bi-directional many-to-one association to User
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner", nullable = false, insertable = false, updatable = false)
	private User owner;

	// bi-directional many-to-one association to Model
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({
			@JoinColumn(name = "name", referencedColumnName = "name", nullable = false, insertable = false, updatable = false),
			@JoinColumn(name = "type", referencedColumnName = "type", nullable = false, insertable = false, updatable = false) })
	private Model model;

	@ManyToMany(mappedBy = "gears", cascade = { MERGE, DETACH, PERSIST, REFRESH })
	private List<Record> records;

	@Override
	public GearPK getId() {
		return id;
	}

	public void setId(GearPK id) {
		this.id = id;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
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