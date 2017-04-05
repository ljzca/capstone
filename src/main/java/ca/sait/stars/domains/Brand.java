package ca.sait.stars.domains;

import javax.persistence.*;

import java.util.List;

/**
 * The persistent class for the stars_brand database table.
 * 
 * Brand is usually to be the manufactor's name of the gear.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_brand", uniqueConstraints = @UniqueConstraint(columnNames = { "name" }))
@NamedQuery(name = "Brand.findAll", query = "SELECT b FROM Brand b")
public class Brand extends AbstractDomain<String> {

	private static final long serialVersionUID = -6167947869322943372L;

	/**
	 * the name of the brand with a maximum length of 30
	 */
	@Id
	@Column(unique = true, nullable = false, length = 30)
	private String name;

	/**
	 * the description of the brand, can be any length or empty
	 */
	@Lob
	private String description;

	// bi-directional many-to-one association to Record
	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "name")
	private List<Model> models;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Model> getModels() {
		return this.models;
	}

	public void setModels(List<Model> models) {
		this.models = models;
	}

	@Override
	public String toString() {
		return name;
	}

	@Override
	public String getId() {
		return name;
	}
}