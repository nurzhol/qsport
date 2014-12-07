package kz.qsport.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import javax.persistence.*;
import java.util.Date;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "auth_detail")
    private String AuthDetail;

    private String comment;

    private String commentLt;

    private String commentAr;

    @ManyToOne
    @JoinColumn(name="news_id")
    private News news;

    @Column(name = "comment_date")
    private Date commentDate = new Date();

    @Column(nullable=false,columnDefinition="number(2) default 0")
    private Integer active;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthDetail() {
        return AuthDetail;
    }

    public void setAuthDetail(String authDetail) {
        AuthDetail = authDetail;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCommentLt() {
        return commentLt;
    }

    public void setCommentLt(String commentLt) {
        this.commentLt = commentLt;
    }

    public String getCommentAr() {
        return commentAr;
    }

    public void setCommentAr(String commentAr) {
        this.commentAr = commentAr;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }


    public Integer getActive() {
        return active;
    }

    public void setActive(Integer active) {
        this.active = active;
    }
}
