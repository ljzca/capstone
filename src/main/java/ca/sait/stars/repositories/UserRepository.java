package ca.sait.stars.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import ca.sait.stars.domains.User;

public interface UserRepository extends PagingAndSortingRepository<User, String> {

}
