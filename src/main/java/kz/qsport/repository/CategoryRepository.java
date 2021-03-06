package kz.qsport.repository;

import kz.qsport.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.repository.annotation.RestResource;

import javax.smartcardio.CardTerminal;
import java.util.List;

/**
 * Interface for the Data Access Object for the Skill model. It extends JpaRepository which is part of Spring Data JPA and declares all the commons
 * methods.
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.custom-behaviour-for-all-repositories</link> <br>
 * This interface aims to be automatically implemented by Spring Data JPA:
 * <link>http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/#repositories.create-instances</link>
 */
@RestResource(exported = true, path = "category")
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("select category from Category category")
    List<Category> findAllWithoutPagination();

    @Query("select category from Category category where category.categoryName=:categoryName")
    Category findOneWithCatName(@Param(value = "categoryName") String categoryName);

}
