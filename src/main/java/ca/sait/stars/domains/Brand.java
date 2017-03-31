package ca.sait.stars.domains;

import javax.persistence.*;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * The persistent class for the stars_brand database table.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_brand", uniqueConstraints = @UniqueConstraint(columnNames = { "name" }))
@NamedQuery(name = "Brand.findAll", query = "SELECT b FROM Brand b")
public class Brand implements Persistable<String> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6167947869322943372L;

	@Id
	@Column(unique = true, nullable = false, length = 30)
	private String name;

	@Lob
	private String description;

	@Version
	@JsonIgnore
	private Long version;

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

	@Override
	public boolean isNew() {
		return version == null;
	}
}