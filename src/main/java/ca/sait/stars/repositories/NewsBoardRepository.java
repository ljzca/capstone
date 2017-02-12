package ca.sait.stars.repositories;

import java.util.Date;

import org.springframework.data.repository.PagingAndSortingRepository;
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
}
