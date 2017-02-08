package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import ca.sait.stars.domains.User;

/**
 * This is a user repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
public interface UserRepository extends PagingAndSortingRepository<User, String> {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.data.repository.CrudRepository#save(S)
	 * 
	 * This method will be invoked during both method calls: post and patch.
	 * However, it doesn't need to be secured because we want guests to be able
	 * to create new users. In addition, update (patch method request) will also
	 * invoke findOne(). Therefore, the security constrain on findOne() will
	 * also be applied during update.
	 */
	@Override
	<S extends User> S save(S entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	<S extends User> Iterable<S> save(Iterable<S> entities);

	@Override
	@PreAuthorize("#i == authentication?.name OR hasRole('ADMIN')")
	User findOne(@Param("i") String id);

	@Override
	boolean exists(String id);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<User> findAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<User> findAll(Iterable<String> ids);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	long count();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(String id);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(User entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(Iterable<? extends User> entities);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void deleteAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<User> findAll(Sort sort);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Page<User> findAll(Pageable pageable);

}