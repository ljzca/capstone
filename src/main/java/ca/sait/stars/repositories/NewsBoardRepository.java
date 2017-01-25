package ca.sait.stars.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import ca.sait.stars.domains.NewsBoard;

public interface NewsBoardRepository extends PagingAndSortingRepository<NewsBoard, String> {

}
