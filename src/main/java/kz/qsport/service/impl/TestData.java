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
public class TestData implements InitializingBean {
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

        if(categoryRepository.count()!=0)
            return;

        //1
        Category category = new Category();
        category.setCategoryLabel("Қысқа жаңалықтар");
        category.setCategoryName("Қысқа жаңалықтар");
        category.setLang("kz");
        categoryRepository.save(category);

        //2
        category = new Category();
        category.setCategoryLabel("Таңдаулы тақырып");
        category.setCategoryName("Таңдаулы тақырып");
        category.setLang("kz");
        categoryRepository.save(category);

        //3
        category = new Category();
        category.setCategoryLabel("Жаңалықтар");
        category.setCategoryName("Жаңалықтар");
        category.setLang("kz");
        categoryRepository.save(category);


        //4
        category = new Category();
        category.setCategoryLabel("Біз жайлы білетідер");
        category.setCategoryName("Біз жайлы білетіндер");
        category.setLang("kz");
        categoryRepository.save(category);

        //5
        category = new Category();
        category.setCategoryLabel("Әлеуметтік жоба");
        category.setCategoryName("Әлеуметтік жоба");
        category.setLang("kz");
        categoryRepository.save(category);


        //6
        category = new Category();
        category.setCategoryLabel("Көкпар");
        category.setCategoryName("Көкпар");
        category.setLang("kz");
        categoryRepository.save(category);

        //7
        category = new Category();
        category.setCategoryLabel("Бәйге");
        category.setCategoryName("Бәйге");
        category.setLang("kz");
        categoryRepository.save(category);

        //8
        category = new Category();
        category.setCategoryLabel("MULTIMEDIA");
        category.setCategoryName("MULTIMEDIA");
        category.setLang("kz");
        categoryRepository.save(category);


        //9
        category = new Category();
        category.setCategoryLabel("NEWS");
        category.setCategoryName("NEWS");
        category.setLang("kz");
        categoryRepository.save(category);

        //10
        category = new Category();
        category.setCategoryLabel("Фотогалерея");
        category.setCategoryName("Фотогалерея");
        category.setLang("kz");
        categoryRepository.save(category);


        //11
        category = new Category();
        category.setCategoryLabel("Талқыланып жатқандар");
        category.setCategoryName("Талқыланып жатқандар");
        category.setLang("kz");
        categoryRepository.save(category);


        //12
        category = new Category();
        category.setCategoryLabel("Ай хой.kz");
        category.setCategoryName("Ай хой.kz");
        category.setLang("kz");
        categoryRepository.save(category);


        //13
        category = new Category();
        category.setCategoryLabel("PICTURE");
        category.setCategoryName("PICTURE");
        category.setLang("kz");
        categoryRepository.save(category);

        //14
        category = new Category();
        category.setCategoryLabel("Ұлттық тағамдар");
        category.setCategoryName("Ұлттық тағамдар");
        category.setLang("kz");
        categoryRepository.save(category);


        //15
        category = new Category();
        category.setCategoryLabel("--video");
        category.setCategoryName("--video");
        category.setLang("kz");
        categoryRepository.save(category);

        //16
        category = new Category();
        category.setCategoryLabel("Спорт сенің назарыңда");
        category.setCategoryName("Спорт сенің назарыңда");
        category.setLang("kz");
        categoryRepository.save(category);

        //17
        category = new Category();
        category.setCategoryLabel("Конкурс");
        category.setCategoryName("Конкурс");
        category.setLang("kz");
        categoryRepository.save(category);

        //18
        category = new Category();
        category.setCategoryLabel("Блог");
        category.setCategoryName("Блог");
        category.setLang("kz");
        categoryRepository.save(category);


        //19
        category = new Category();
        category.setCategoryLabel("Бәсіре");
        category.setCategoryName("Бәсіре");
        category.setLang("kz");
        categoryRepository.save(category);

        //20
        category = new Category();
        category.setCategoryLabel("Әлеуметтік желідеміз");
        category.setCategoryName("Әлеуметтік желідеміз");
        category.setLang("kz");
        categoryRepository.save(category);


        //21
        category = new Category();
        category.setCategoryLabel("Редакция алқасы");
        category.setCategoryName("Редакция алқасы");
        category.setLang("kz");
        categoryRepository.save(category);

        //22
        category = new Category();
        category.setCategoryLabel("Ұлттық құндылықтар");
        category.setCategoryName("Ұлттық құндылықтар");
        category.setLang("kz");
        categoryRepository.save(category);

        //23
        category = new Category();
        category.setCategoryLabel("Кітап сөресі");
        category.setCategoryName("Кітап сөресі");
        category.setLang("kz");
        categoryRepository.save(category);

    }

}
