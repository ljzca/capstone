package ca.sait.stars.domains;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the stars_model database table.
 * 
 * @author william
 *
 */
@Embeddable
public class ModelPK implements Serializable {

    private static final long serialVersionUID = 6641100107954248015L;

    @Column(nullable = false, insertable = false, updatable = false, length = 30)
    private String name;

    @Column(nullable = false, insertable = false, updatable = false, length = 30)
    private String type;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (!(other instanceof ModelPK)) {
            return false;
        }
        ModelPK castOther = (ModelPK) other;
        return this.name.equals(castOther.name) && this.type.equals(castOther.type);
    }

    public int hashCode() {
        final int prime = 31;
        int hash = 17;
        hash = hash * prime + this.name.hashCode();
        hash = hash * prime + this.type.hashCode();

        return hash;
    }

    @Override
    public String toString() {
        return name + "&" + type;
    }
}