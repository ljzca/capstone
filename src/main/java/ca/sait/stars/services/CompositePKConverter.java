package ca.sait.stars.services;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.rest.webmvc.spi.BackendIdConverter;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.Record;
import ca.sait.stars.domains.RecordData;
import ca.sait.stars.domains.RecordDataPK;
import ca.sait.stars.domains.RecordPK;

@Service
class CompositePKConverter implements BackendIdConverter {

	@Override
	public boolean supports(Class<?> delimiter) {

		if (delimiter.isAssignableFrom(Record.class))
			return true;

		if (delimiter.isAssignableFrom(RecordData.class))
			return true;

		return false;
	}

	@Override
	public Serializable fromRequestId(String id, Class<?> entityType) {

		if (entityType.isAssignableFrom(Record.class)) {
			int delimiterPos = id.indexOf("&");
			String username = id.substring(0, delimiterPos), title = id.substring(delimiterPos + 1);
			RecordPK recordPK = new RecordPK();
			recordPK.setOwner(username);
			recordPK.setTitle(title);
			return recordPK;
		}

		if (entityType.isAssignableFrom(RecordData.class)) {
			int firstDelimiterPos = id.indexOf("&"), secondDelimiterPos = id.lastIndexOf("&");
			String username = id.substring(0, firstDelimiterPos),
					title = id.substring(firstDelimiterPos + 1, secondDelimiterPos),
					time = id.substring(secondDelimiterPos + 1);
			RecordDataPK recordDataPK = new RecordDataPK();
			recordDataPK.setOwner(username);
			recordDataPK.setTitle(title);
			recordDataPK.setTime(new Date(Long.parseLong(time)));
			return recordDataPK;
		}

		return null;
	}

	@Override
	public String toRequestId(Serializable id, Class<?> entityType) {
		return id.toString();
	}
}