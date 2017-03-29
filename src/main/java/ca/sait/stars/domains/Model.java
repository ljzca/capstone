package ca.sait.stars.domains;

import javax.persistence.*;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * The persistent class for the stars_model database table.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_model", uniqueConstraints = @UniqueConstraint(columnNames = { "make", "type" }))
@NamedQuery(name = "Model.findAll", query = "SELECT m FROM Model m")
public class Model implements Persistable<ModelPK> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2138350065961289313L;

	@EmbeddedId
	private ModelPK id;

	@Lob
	private String description;

	@Version
	@JsonIgnore
	private Long version;

	// bi-directional many-to-one association to Brand
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "make", nullable = false, insertable = false, updatable = false)
	private Brand make;

	// bi-directional many-to-one association to Gear
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "model")
	private List<Gear> gear;

	@Override
	public ModelPK getId() {
		return this.id;
	}

	public void setId(ModelPK id) {
		this.id = id;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Brand getMake() {
		return make;
	}

	public void setMake(Brand make) {
		this.make = make;
	}

	public List<Gear> getGear() {
		return gear;
	}

	public void setGear(List<Gear> gear) {
		this.gear = gear;
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