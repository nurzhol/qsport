package kz.qsport.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class Pdf {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "pdf_label")
    private String pdfLabel;

    @Column(name = "pdf_image_url")
    private String pdfImageUrl;

    @Column(name = "pdf_url")
    private String pdfUrl;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPdfLabel() {
        return pdfLabel;
    }

    public void setPdfLabel(String pdfLabel) {
        this.pdfLabel = pdfLabel;
    }

    public String getPdfImageUrl() {
        return pdfImageUrl;
    }

    public void setPdfImageUrl(String pdfImageUrl) {
        this.pdfImageUrl = pdfImageUrl;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }
}
