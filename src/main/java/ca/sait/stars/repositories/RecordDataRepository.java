package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import ca.sait.stars.domains.RecordData;
import ca.sait.stars.domains.RecordDataPK;

/**
 * This is a record data repository interface which will be used to auto
 * generate service layer based on annotations and configurations
 * 
 * @author william
 *
 */
@Repository
public interface RecordDataRepository extends PagingAndSortingRepository<RecordData, RecordDataPK> {

	@Override
	@PreAuthorize("#s?.id?.owner == authentication?.name OR hasRole('ADMIN')")
	<S extends RecordData> S save(@Param("s") S entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	<S extends RecordData> Iterable<S> save(Iterable<S> entities);

	@Override
	@PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
	RecordData findOne(@Param("i") RecordDataPK id);

	@Override
	@PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
	boolean exists(@Param("i") RecordDataPK id);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<RecordData> findAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<RecordData> findAll(Iterable<RecordDataPK> ids);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	long count();

	@Override
	@PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
	void delete(@Param("i") RecordDataPK id);

	@Override
	@PreAuthorize("#s?.id?.owner == authentication?.name OR hasRole('ADMIN')")
	void delete(@Param("s") RecordData entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(Iterable<? extends RecordData> entities);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void deleteAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<RecordData> findAll(Sort sort);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Page<RecordData> findAll(Pageable pageable);
}
