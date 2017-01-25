package ca.sait.stars.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import ca.sait.stars.domains.Record;

public interface RecordRepository extends PagingAndSortingRepository<Record, Integer> {

}
