package ca.sait.stars.domains;

import javax.persistence.*;

import java.util.List;

/**
 * The persistent class for the stars_model database table.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_model", uniqueConstraints = @UniqueConstraint(columnNames = { "name", "type" }))
@NamedQuery(name = "Model.findAll", query = "SELECT m FROM Model m")
public class Model extends AbstractDomain<ModelPK> {

	private static final long serialVersionUID = -2138350065961289313L;

	@EmbeddedId
	private ModelPK id;

	@Lob
	private String description;

	// bi-directional many-to-one association to Brand
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "name", nullable = false, insertable = false, updatable = false)
	private Brand name;

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

	public Brand getName() {
		return name;
	}

	public void setName(Brand name) {
		this.name = name;
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
}