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
            user.setRoles(";roleForUser;roleForCategory");
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
        category.setCategoryName("cat1");
        category.setLang("kz");
        categoryRepository.save(category);

        //2
        category = new Category();
        category.setCategoryLabel("Таңдаулы тақырып");
        category.setCategoryName("cat2");
        category.setLang("kz");
        categoryRepository.save(category);

        //3
        category = new Category();
        category.setCategoryLabel("Жаңалықтар");
        category.setCategoryName("cat3");
        category.setLang("kz");
        categoryRepository.save(category);


        //4
        category = new Category();
        category.setCategoryLabel("Біз жайлы білетідер");
        category.setCategoryName("cat4");
        category.setLang("kz");
        categoryRepository.save(category);

        //5
        category = new Category();
        category.setCategoryLabel("Әлеуметтік жоба");
        category.setCategoryName("cat5");
        category.setLang("kz");
        categoryRepository.save(category);


        //6
        category = new Category();
        category.setCategoryLabel("Көкпар");
        category.setCategoryName("cat6");
        category.setLang("kz");
        categoryRepository.save(category);

        //7
        category = new Category();
        category.setCategoryLabel("Бәйге");
        category.setCategoryName("cat7");
        category.setLang("kz");
        categoryRepository.save(category);

        //8
        category = new Category();
        category.setCategoryLabel("MULTIMEDIA");
        category.setCategoryName("cat8");
        category.setLang("kz");
        categoryRepository.save(category);


        //9
        category = new Category();
        category.setCategoryLabel("NEWS");
        category.setCategoryName("NEWS");
        category.setLang("kz");
        category.setCategoryName("cat9");

        //10
        category = new Category();
        category.setCategoryLabel("Фотогалерея");
        category.setCategoryName("cat10");
        category.setLang("kz");
        categoryRepository.save(category);


        //11
        category = new Category();
        category.setCategoryLabel("Талқыланып жатқандар");
        category.setCategoryName("cat11");
        category.setLang("kz");
        categoryRepository.save(category);


        //12
        category = new Category();
        category.setCategoryLabel("Ай хой.kz");
        category.setCategoryName("cat12");
        category.setLang("kz");
        categoryRepository.save(category);


        //13
        category = new Category();
        category.setCategoryLabel("PICTURE");
        category.setCategoryName("cat13");
        category.setLang("kz");
        categoryRepository.save(category);

        //14
        category = new Category();
        category.setCategoryLabel("Ұлттық тағамдар");
        category.setCategoryName("cat14");
        category.setLang("kz");
        categoryRepository.save(category);


        //15
        category = new Category();
        category.setCategoryLabel("--video");
        category.setCategoryName("cat15");
        category.setLang("kz");
        categoryRepository.save(category);

        //16
        category = new Category();
        category.setCategoryLabel("Спорт сенің назарыңда");
        category.setCategoryName("cat16");
        category.setLang("kz");
        categoryRepository.save(category);

        //17
        category = new Category();
        category.setCategoryLabel("Конкурс");
        category.setCategoryName("cat17");
        category.setLang("kz");
        categoryRepository.save(category);

        //18
        category = new Category();
        category.setCategoryLabel("Блог");
        category.setCategoryName("cat18");
        category.setLang("kz");
        categoryRepository.save(category);


        //19
        category = new Category();
        category.setCategoryLabel("Бәсіре");
        category.setCategoryName("cat19");
        category.setLang("kz");
        categoryRepository.save(category);

        //20
        category = new Category();
        category.setCategoryLabel("Әлеуметтік желідеміз");
        category.setCategoryName("cat20");
        category.setLang("kz");
        categoryRepository.save(category);


        //21
        category = new Category();
        category.setCategoryLabel("Редакция алқасы");
        category.setCategoryName("cat21");
        category.setLang("kz");
        categoryRepository.save(category);

        //22
        category = new Category();
        category.setCategoryLabel("Ұлттық құндылықтар");
        category.setCategoryName("cat22");
        category.setLang("kz");
        categoryRepository.save(category);

        //23
        category = new Category();
        category.setCategoryLabel("Кітап сөресі");
        category.setCategoryName("cat23");
        category.setLang("kz");
        categoryRepository.save(category);

        //24
        category = new Category();
        category.setCategoryLabel("ҚАУЫМДАСТЫҚ");
        category.setCategoryName("cat24");
        category.setLang("kz");
        categoryRepository.save(category);

        //25
        category = new Category();
        category.setCategoryLabel("ҰЛТТЫҚ СПОРТ ТҮРЛЕРІ");
        category.setCategoryName("cat25");
        category.setLang("kz");
        categoryRepository.save(category);

        //26
        category = new Category();
        category.setCategoryLabel("БАҺАДҮР");
        category.setCategoryName("cat26");
        category.setLang("kz");
        categoryRepository.save(category);

        //27
        category = new Category();
        category.setCategoryLabel("БАСҚА ЖАҢАЛЫҚТАР");
        category.setCategoryName("cat27");
        category.setLang("kz");
        categoryRepository.save(category);

    }

}
