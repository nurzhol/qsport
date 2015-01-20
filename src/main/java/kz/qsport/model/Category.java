package kz.qsport.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_label")
    private String categoryLabel;

    @Column(name = "category_label_lt")
    private String categoryLabelLt;

    @Column(name = "category_label_ar")
    private String categoryLabelAr;

    @Column
    private String lang;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "category")
    private Set<News> news = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public void setCategoryLabel(String categoryLabel) {
        this.categoryLabel = categoryLabel;
    }

    public Set<News> getNews() {
        return news;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getCategoryLabelLt() {
        return categoryLabelLt;
    }

    public void setCategoryLabelLt(String categoryLabelLt) {
        this.categoryLabelLt = categoryLabelLt;
    }

    public String getCategoryLabelAr() {
        return categoryLabelAr;
    }

    public void setCategoryLabelAr(String categoryLabelAr) {
        this.categoryLabelAr = categoryLabelAr;
    }
}
