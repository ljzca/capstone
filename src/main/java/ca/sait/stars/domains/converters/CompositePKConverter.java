package ca.sait.stars.domains.converters;

import java.io.Serializable;
//import java.util.Date;

import org.springframework.data.rest.webmvc.spi.BackendIdConverter;
import org.springframework.stereotype.Service;

import ca.sait.stars.domains.Gear;
import ca.sait.stars.domains.GearPK;
import ca.sait.stars.domains.Model;
import ca.sait.stars.domains.ModelPK;
import ca.sait.stars.domains.Record;
import ca.sait.stars.domains.RecordData;
import ca.sait.stars.domains.RecordDataPK;
import ca.sait.stars.domains.RecordPK;

/**
 * This is a service to convert string id submitted from client in a URL to a
 * composite key object
 * 
 * @author william
 *
 */
@Service
class CompositePKConverter implements BackendIdConverter {

	@Override
	public boolean supports(Class<?> delimiter) {

		if (delimiter.isAssignableFrom(Record.class))
			return true;

		if (delimiter.isAssignableFrom(RecordData.class))
			return true;

		if (delimiter.isAssignableFrom(Model.class))
			return true;

		if (delimiter.isAssignableFrom(Gear.class))
			return true;

		return false;
	}

	@Override
	public Serializable fromRequestId(String id, Class<?> entityType) {
		try {
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
				// recordDataPK.setTime(new Date(Long.parseLong(time)));
				recordDataPK.setTime(Long.parseLong(time));
				return recordDataPK;
			}

			if (entityType.isAssignableFrom(Model.class)) {
				int delimiterPos = id.indexOf("&");
				String make = id.substring(0, delimiterPos), type = id.substring(delimiterPos + 1);
				ModelPK modelPK = new ModelPK();
				modelPK.setMake(make);
				modelPK.setType(type);
				return modelPK;
			}

			if (entityType.isAssignableFrom(Gear.class)) {
				String[] ids = id.split("&");
				GearPK gearPK = new GearPK();
				gearPK.setMake(ids[0]);
				gearPK.setType(ids[1]);
				gearPK.setOwner(ids[2]);
				gearPK.setId(Integer.parseInt(ids[ids.length - 1]));
				return gearPK;
			}
		} catch (Exception e) {
			// silent catch
		}

		return null;
	}

	@Override
	public String toRequestId(Serializable id, Class<?> entityType) {
		return id.toString();
	}
}