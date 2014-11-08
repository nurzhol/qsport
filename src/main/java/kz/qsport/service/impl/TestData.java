package kz.qsport.service.impl;

import kz.qsport.model.Category;
import kz.qsport.model.User;
import kz.qsport.repository.CategoryRepository;
import kz.qsport.repository.UserRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by yerganat on 11/1/14.
 */
@Service
public class TestData implements  InitializingBean {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CategoryRepository categoryRepository;
    /**
     * By implementing InitializingBean in a Spring bean, this method will be launch after Spring wirings are finished.<br/>
     * It's used here to perform a check at the loading of the application on the content of the user table a adding the first user if it's empty. This
     * way, there is no need of SQL initialization script which is so boring to handle (and even more on CloudFoundry)
     */
    public void afterPropertiesSet() throws Exception {
        System.out.println("kikoo");

        if (userRepository.count() == 0) {
            User user = new User();
            user.setFullname("admin");
            user.setLogin("admin");
            user.setPassword("admin");
            userRepository.save(user);
            for (int i = 0; i < 5; i++) {
                user = new User();
                user.setFullname("full name " + i);
                user.setLogin("login " + i);
                user.setPassword("password" + i);
                userRepository.save(user);
            }
        }

        /*Set<News> newses = new HashSet<>();
        for(int i=0; i<5; i++){
            News news = new News();
            news.set
        }*/
        for (int i = 0; i < 5; i++) {
            Category category = new Category();
            category.setCategoryLabel("Категория "+i);
            category.setCategoryName("cat"+i);


            categoryRepository.save(category);
        }


    }

}
