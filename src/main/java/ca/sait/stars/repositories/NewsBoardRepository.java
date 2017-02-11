package ca.sait.stars.repositories;

import java.util.Date;

import org.springframework.data.repository.PagingAndSortingRepository;
import ca.sait.stars.domains.NewsBoard;

/**
 * This is a record repository interface which will be used to auto generate
 * service layer based on annotations and configurations
 * 
 * @author william
 *
 */
public interface NewsBoardRepository extends PagingAndSortingRepository<NewsBoard, Date> {
}
