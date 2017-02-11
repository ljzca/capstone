package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import ca.sait.stars.domains.Record;
import ca.sait.stars.domains.RecordPK;

/**
 * This is a record repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
public interface RecordRepository extends PagingAndSortingRepository<Record, RecordPK> {

	@Override
	@PreAuthorize("@recordInspector.checkOwnership(authentication,#s)")
	<S extends Record> S save(@Param("s") S entity);

	@Override
	<S extends Record> Iterable<S> save(Iterable<S> entities);

	@Override
	@PreAuthorize("@recordInspector.checkOwnership(authentication,#i)")
	Record findOne(@Param("i") RecordPK id);

	@Override
	boolean exists(RecordPK id);

	@Override
	Iterable<Record> findAll();

	@Override
	Iterable<Record> findAll(Iterable<RecordPK> ids);

	@Override
	long count();

	@Override
	void delete(RecordPK id);

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
