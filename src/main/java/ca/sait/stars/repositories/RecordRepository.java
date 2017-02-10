package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import ca.sait.stars.domains.Record;

/**
 * This is a record repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
public interface RecordRepository extends PagingAndSortingRepository<Record, Integer> {

	@Override
	<S extends Record> S save(S entity);

	@Override
	<S extends Record> Iterable<S> save(Iterable<S> entities);

	@Override
	@PreAuthorize("@recordInspector.check(authentication,#i)")
	Record findOne(@Param("i") Integer id);

	@Override
	boolean exists(Integer id);

	@Override
	Iterable<Record> findAll();

	@Override
	Iterable<Record> findAll(Iterable<Integer> ids);

	@Override
	long count();

	@Override
	void delete(Integer id);

	@Override
	void delete(Record entity);

	@Override
	void delete(Iterable<? extends Record> entities);

	@Override
	void deleteAll();

	@Override
	Iterable<Record> findAll(Sort sort);

	@Override
	Page<Record> findAll(Pageable pageable);

}
