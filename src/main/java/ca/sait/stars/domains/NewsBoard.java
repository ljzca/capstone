package ca.sait.stars.domains;

import java.util.Date;

public class NewsBoard implements IDomain<String> {

	private String title;
	private Date date;
	private String content;

	public NewsBoard() {
		// TODO Auto-generated constructor stub
	}

	public NewsBoard(String title, Date date, String content) {
		super();
		this.title = title;
		this.date = date;
		this.content = content;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	// Not quite sure what to do with this method.

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return title;
	}
}