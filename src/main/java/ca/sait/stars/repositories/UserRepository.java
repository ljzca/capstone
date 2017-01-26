package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import ca.sait.stars.domains.User;

public interface UserRepository extends PagingAndSortingRepository<User, String> {

	@Override
	<S extends User> S save(S entity);

	@Override
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
	long count();

	@Override
	void delete(String id);

	@Override
	void delete(User entity);

	@Override
	void delete(Iterable<? extends User> entities);

	@Override
	void deleteAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<User> findAll(Sort sort);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Page<User> findAll(Pageable pageable);

}
