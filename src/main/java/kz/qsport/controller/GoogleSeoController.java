package kz.qsport.controller;

import kz.qsport.model.Category;
import kz.qsport.model.News;
import kz.qsport.repository.CategoryRepository;
import kz.qsport.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/google")
public class GoogleSeoController {

    @Autowired
    NewsRepository newsRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String print(ModelMap model, @RequestParam("_escaped_fragment_") String hashPath) {


        String cataling = System.getProperty("catalina.home");
        String user = System.getProperty("user.home");
        String dir = System.getProperty("user.dir");
        String catbase = System.getProperty("catalina.base");
        String userDir = System.getProperty("user.dir");

        System.out.println("catalina.home " + cataling);
        System.out.println("user.home " + user);
        System.out.println("user.dir " + dir);
        System.out.println("catalina.base " + catbase);
        System.out.println("user.dir" + userDir);



        String content = "";
        if(hashPath.contains("readcat")){
            Category category = categoryRepository.findOne(Integer.valueOf(hashPath.substring(hashPath.indexOf("/")+1)));

            content = category.getCategoryLabel() + "<br>" + category.getCategoryLabel() + "<br>" + category.getCategoryLabelLt() + "<br>" +category.getCategoryLabelAr();
        }

        if(hashPath.contains("readnews")){
            News news = newsRepository.findOne(Integer.valueOf(hashPath.substring(hashPath.indexOf("/")+1)));
            content = news.getNewsDetail() + "<br>" + news.getNewsDetailLt()  + "<br>" + news.getNewsDetailAr()  + "<br>" +
                    news.getNewsFeature() + "<br>" + news.getNewsFeatureLt()  + "<br>" + news.getNewsFeatureAr()  + "<br>" +
                    news.getNewsTitle() + "<br>" + news.getNewsTitleLt()  + "<br>" + news.getNewsTitleAr();
        }
        model.addAttribute("searchContent", content );
        return "google";
    }


}
