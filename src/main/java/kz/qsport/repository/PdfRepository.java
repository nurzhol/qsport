package kz.qsport.repository;

import kz.qsport.model.Pdf;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.repository.annotation.RestResource;

import java.util.List;


/**
 * Interface for the Data Access Object for the Skill model. It extends JpaRepository which is part of Spring Data JPA and declares all the commons
 * methods.
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.custom-behaviour-for-all-repositories</link> <br>
 * This interface aims to be automatically implemented by Spring Data JPA:
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.create-instances</link>
 */
@RestResource(exported = true, path = "pdf")
public interface PdfRepository extends JpaRepository<Pdf, Integer> {

    @Query("select pdf from Pdf pdf")
    List<Pdf> findAllWithoutPagination();

    @Query("select pdf from Pdf pdf")
    Page<Pdf> findByPdfByPage(Pageable p);


    @Query("select pdf from Pdf pdf where pdf.id = :pdfId")
    List<Pdf> findByPdfId(@Param(value = "pdfId") String pdfId);

}
