package ca.sait.stars.domains;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the stars_record database table.
 * 
 * @author william
 *
 */
@Embeddable
public class RecordPK implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 5457540082422531295L;

    @Column(nullable = false, insertable = false, updatable = false, length = 30)
    private String owner;

    @Column(nullable = false, insertable = false, updatable = false, length = 50)
    private String title;

    public String getOwner() {
        return this.owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (!(other instanceof RecordPK)) {
            return false;
        }
        RecordPK castOther = (RecordPK) other;
        return this.owner.equals(castOther.owner) && this.title.equals(castOther.title);
    }

    public int hashCode() {
        final int prime = 31;
        int hash = 17;
        hash = hash * prime + this.owner.hashCode();
        hash = hash * prime + this.title.hashCode();

        return hash;
    }

    @Override
    public String toString() {
        return owner + "&" + title;
    }
}