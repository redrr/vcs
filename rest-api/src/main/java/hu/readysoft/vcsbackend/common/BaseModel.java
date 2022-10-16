package hu.readysoft.vcsbackend.common;

import hu.readysoft.vcsbackend.modules.auth.role.Role;
import lombok.Getter;
import lombok.experimental.FieldNameConstants;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.Optional;

@MappedSuperclass
@Getter
@FieldNameConstants
public abstract class BaseModel<T extends BaseModel> {

    public static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="ID", unique=true, nullable=false)
    private Integer id;

    @Column(name="CREATED_BY")
    @CreatedBy
    private String createdBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="CREATION_DATE", nullable=false)
    @CreatedDate
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="LAST_UPDATE_DATE")
    @LastModifiedDate
    private Date lastUpdateDate;

    @Column(name="LAST_UPDATED_BY")
    @LastModifiedBy
    private String lastUpdatedBy;

    @Column(name="VERSION")
    @Version
    private int version = 1;

    @PrePersist
    protected void setAutoCreateDate() {
        this.creationDate = new Date();
        this.createdBy = "Todo Users";
        this.version = 1;
    }

    @PreUpdate
    protected void setAutoLastUpdateDate() {
        this.lastUpdateDate = new Date();
        this.lastUpdatedBy = "Todo Users";
        this.version++;
    }

    public abstract void merge(T orig);
}
