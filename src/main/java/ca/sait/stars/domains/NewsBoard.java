package ca.sait.stars.domains;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class NewsBoard {

	@Id
	private String title;
	private Date date;
	private String content;

	public NewsBoard() {
		// TODO Auto-generated constructor stub
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
}