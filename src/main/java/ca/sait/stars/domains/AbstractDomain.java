package ca.sait.stars.domains;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Abstract domain class, all managed domains should derive from this class.
 * This class cooperates with Spring Data JPA. So in general, this class should
 * not be changed.
 * 
 * @author William
 *
 * @param <ID>
 *            the time of the ID
 */
@MappedSuperclass
public abstract class AbstractDomain<ID extends Serializable> implements Persistable<ID> {

	private static final long serialVersionUID = -7526002818770935094L;

	@Version
	@JsonIgnore
	private Long version;

	@Override
	public boolean isNew() {
		return version == null;
	}
}
