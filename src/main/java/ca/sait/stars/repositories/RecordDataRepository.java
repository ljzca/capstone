package ca.sait.stars.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import ca.sait.stars.domains.RecordData;
import ca.sait.stars.domains.RecordDataPK;

public interface RecordDataRepository extends PagingAndSortingRepository<RecordData, RecordDataPK> {
}
