package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import ca.sait.stars.domains.Record;
import ca.sait.stars.domains.RecordPK;

/**
 * This is a record repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
/*
 * To invoke method:
 * 
 * Use @PreAuthorize(
 * "@classNameWithFirstLetterInLowerCase.methodName(authentication,#s,otherArguments...)")
 * annotation with expression language to invoke a method. @Component or other
 * stereotype is needed for the class. Plus, @Autowired can be used for
 * accessing other beans, e.g. Repositories
 */
@Repository
public interface RecordRepository extends PagingAndSortingRepository<Record, RecordPK> {

	@Override
	@PreAuthorize("#s?.id?.owner == authentication?.name OR hasRole('ADMIN')")
	<S extends Record> S save(@Param("s") S entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	<S extends Record> Iterable<S> save(Iterable<S> entities);

	@Override
	@PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
	Record findOne(@Param("i") RecordPK id);

	@Override
	@PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
	boolean exists(@Param("i") RecordPK id);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<Record> findAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<Record> findAll(Iterable<RecordPK> ids);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	long count();

	@Override
	@PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
	void delete(@Param("i") RecordPK id);

	@Override
	@PreAuthorize("#s?.id?.owner == authentication?.name OR hasRole('ADMIN')")
	void delete(@Param("s") Record entity);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void delete(Iterable<? extends Record> entities);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	void deleteAll();

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Iterable<Record> findAll(Sort sort);

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	Page<Record> findAll(Pageable pageable);
}
