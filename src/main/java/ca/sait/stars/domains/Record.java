package ca.sait.stars.domains;

import java.util.Date;

public class Record implements IDomain<Integer> {

	private int recordId;
	private Date startTime;
	private Date endTime;
	private String routeData;
	private String title;
	private Date date;
	private String description;

	public Record() {

	}

	public Record(Date startTime, Date endTime, String routeData, String title, Date date, String description) {
		this.startTime = startTime;
		this.endTime = endTime;
		this.routeData = routeData;
		this.title = title;
		this.date = date;
		this.description = description;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getRouteData() {
		return routeData;
	}

	public void setRouteData(String routeData) {
		this.routeData = routeData;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public Integer getId() {
		return recordId;
	}
}