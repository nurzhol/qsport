package kz.qsport.repository;

import kz.qsport.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.repository.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Interface for the Data Access Object for the Skill model. It extends JpaRepository which is part of Spring Data JPA and declares all the commons
 * methods.
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.custom-behaviour-for-all-repositories</link> <br>
 * This interface aims to be automatically implemented by Spring Data JPA:
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.create-instances</link>
 */
@RestResource(exported = true, path = "comment")
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("select c from Comment c where c.news.id = :news_id and c.active = 1 order by c.commentDate desc ")
    List<Comment> findByNews(@Param(value = "news_id") Integer newsId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Comment c set c.active = 1 where c.id =:commentId")
    void activate(@Param("commentId") Integer commentId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("delete Comment c where c.id =:commentId")
    void delete(@Param("commentId") Integer commentId);
}
