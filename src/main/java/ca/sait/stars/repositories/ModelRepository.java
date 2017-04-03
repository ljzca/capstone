package ca.sait.stars.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import ca.sait.stars.domains.Model;
import ca.sait.stars.domains.ModelPK;

/**
 * This is a Model repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
@Repository
public interface ModelRepository extends PagingAndSortingRepository<Model, ModelPK> {

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Model> S save(S entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Model> Iterable<S> save(Iterable<S> entities);

    @Override
    Model findOne(ModelPK id);

    @Override
    boolean exists(ModelPK id);

    @Override
    Iterable<Model> findAll();

    @Override
    Iterable<Model> findAll(Iterable<ModelPK> ids);

    @Override
    long count();

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(ModelPK id);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Model entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends Model> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();

    @Override
    Iterable<Model> findAll(Sort sort);

    @Override
    Page<Model> findAll(Pageable pageable);
}
