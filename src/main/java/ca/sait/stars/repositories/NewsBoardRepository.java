package ca.sait.stars.repositories;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import ca.sait.stars.domains.NewsBoard;

/**
 * This is a news board repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
@Repository
public interface NewsBoardRepository extends PagingAndSortingRepository<NewsBoard, Date> {
	@Override
	@PreAuthorize("hasRole('ADMIN')")
	<S extends NewsBoard> S save(S entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	<S extends NewsBoard> Iterable<S> save(Iterable<S> entities);

	@Override
	NewsBoard findOne(Date id);

	@Override
	boolean exists(Date id);

	@Override
	Iterable<NewsBoard> findAll();

	@Override
	Iterable<NewsBoard> findAll(Iterable<Date> ids);

	@Override
	long count();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(Date id);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(NewsBoard entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(Iterable<? extends NewsBoard> entities);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void deleteAll();

	@Override
	Iterable<NewsBoard> findAll(Sort sort);

	@Override
	Page<NewsBoard> findAll(Pageable pageable);
}
