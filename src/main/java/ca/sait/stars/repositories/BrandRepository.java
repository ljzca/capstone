package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import ca.sait.stars.domains.Brand;

/**
 * This is a Brand repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
@Repository
public interface BrandRepository extends PagingAndSortingRepository<Brand, String> {

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Brand> S save(S entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Brand> Iterable<S> save(Iterable<S> entities);

    @Override
    Brand findOne(String id);

    @Override
    boolean exists(String id);

    @Override
    Iterable<Brand> findAll();

    @Override
    Iterable<Brand> findAll(Iterable<String> ids);

    @Override
    long count();

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(String id);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Brand entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends Brand> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();

    @Override
    Iterable<Brand> findAll(Sort sort);

    @Override
    Page<Brand> findAll(Pageable pageable);
}
