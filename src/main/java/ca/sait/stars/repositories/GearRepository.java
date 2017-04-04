package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import ca.sait.stars.domains.Gear;
import ca.sait.stars.domains.GearPK;

/**
 * This is a Gear repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
@Repository
public interface GearRepository extends PagingAndSortingRepository<Gear, GearPK> {

    @Override
    @PreAuthorize("#s?.id?.owner == authentication?.name OR hasRole('ADMIN')")
    <S extends Gear> S save(@Param("s") S entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Gear> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
    Gear findOne(@Param("i") GearPK id);

    @Override
    @PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
    boolean exists(@Param("i") GearPK id);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    Iterable<Gear> findAll();

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    Iterable<Gear> findAll(Iterable<GearPK> ids);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    long count();

    @Override
    @PreAuthorize("#i?.owner == authentication?.name OR hasRole('ADMIN')")
    void delete(@Param("i") GearPK id);

    @Override
    @PreAuthorize("#s?.id?.owner == authentication?.name OR hasRole('ADMIN')")
    void delete(@Param("s") Gear entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends Gear> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    Iterable<Gear> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    Page<Gear> findAll(Pageable pageable);
}
