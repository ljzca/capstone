package ca.sait.stars.domains;

import javax.persistence.*;
import java.util.Date;

/**
 * The persistent class for the stars_news_board database table.
 * 
 * In the current version (v1.0), NewsBoard is not used.
 * 
 * @author william
 *
 */
@Entity
@Table(name = "stars_news_board")
@NamedQuery(name = "NewsBoard.findAll", query = "SELECT n FROM NewsBoard n")
public class NewsBoard extends AbstractDomain<Date> {

	private static final long serialVersionUID = -7887975624261414585L;

	/**
	 * The time is also the identifier of the news
	 */
	@Id
	@Temporal(TemporalType.TIMESTAMP)
	@Column(unique = true, nullable = false)
	private Date time;

	/**
	 * The actual content.
	 */
	@Column(nullable = false)
	@Lob
	private String content;

	/**
	 * The title of the news
	 */
	@Column(nullable = false, length = 255)
	private String title;

	public Date getTime() {
		return this.time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public Date getId() {
		return time;
	}
}