package kz.qsport.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "news_title")
    private String newsTitle;

    @Column(name = "news_feature")
    private String newsFeature;

    @Lob
    @Column(name = "news_detail")
    private String newsDetail;

    @Column(name = "news_title_lt")
    private String newsTitleLt;

    @Column(name = "news_feature_lt")
    private String newsFeatureLt;

    @Lob
    @Column(name = "news_detail_lt")
    private String newsDetailLt;

    @Column(name = "news_title_ar")
    private String newsTitleAr;

    @Column(name = "news_feature_ar")
    private String newsFeatureAr;

    @Lob
    @Column(name = "news_detail_ar")
    private String newsDetailAr;

    private Integer favorate;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "news")
    private Set<Comment> comments = new HashSet<>();

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "create_date")
    private Date createDate = new Date();

    @Column(name = "edited_date")
    private Date editedDate = new Date();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNewsTitleLt() {
        return newsTitleLt;
    }

    public void setNewsTitleLt(String newsTitleLt) {
        this.newsTitleLt = newsTitleLt;
    }

    public String getNewsDetailLt() {
        return newsDetailLt;
    }

    public void setNewsDetailLt(String newsDetailLt) {
        this.newsDetailLt = newsDetailLt;
    }

    public String getNewsTitleAr() {
        return newsTitleAr;
    }

    public void setNewsTitleAr(String newsTitleAr) {
        this.newsTitleAr = newsTitleAr;
    }

    public String getNewsDetailAr() {
        return newsDetailAr;
    }

    public void setNewsDetailAr(String newsDetailAr) {
        this.newsDetailAr = newsDetailAr;
    }

    public String getNewsFeature() {
        return newsFeature;
    }

    public void setNewsFeature(String newsFeature) {
        this.newsFeature = newsFeature;
    }

    public String getNewsFeatureLt() {
        return newsFeatureLt;
    }

    public void setNewsFeatureLt(String newsFeatureLt) {
        this.newsFeatureLt = newsFeatureLt;
    }

    public String getNewsFeatureAr() {
        return newsFeatureAr;
    }

    public void setNewsFeatureAr(String newsFeatureAr) {
        this.newsFeatureAr = newsFeatureAr;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsDetail() {
        return newsDetail;
    }

    public void setNewsDetail(String newsDetail) {
        this.newsDetail = newsDetail;
    }

    public Integer getFavorate() {
        return favorate;
    }

    public void setFavorate(Integer favorate) {
        this.favorate = favorate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getEditedDate() {
        return editedDate;
    }

    public void setEditedDate(Date editedDate) {
        this.editedDate = editedDate;
    }

}
