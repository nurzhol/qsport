package kz.qsport;

import com.redfin.sitemapgenerator.WebSitemapGenerator;
import kz.qsport.model.Category;
import kz.qsport.model.News;
import kz.qsport.repository.CategoryRepository;
import kz.qsport.repository.NewsRepository;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.List;

/**
 * Created by yerganat on 2/7/15.
 */
public class SiteMapXmlGeneratorJob implements Job {

    public static NewsRepository newsRepository;

    public static CategoryRepository categoryRepository;

    public SiteMapXmlGeneratorJob() {
    }

    @Override
    public void execute(JobExecutionContext arg0) throws JobExecutionException {
        System.out.println("Job started");
        String baseUrl = "http://www.qqsport.mycloud.by/";
        //String path = "/home/yerganat/IdeaProjects/qsport/src/main/webapp";
        String path = System.getProperty("catalina.home") + "webapps/ROOT";
        File siteMapXmlDir = new File(path);

        System.out.println("Create file " + siteMapXmlDir);
        WebSitemapGenerator wsg = null;
        try {
            wsg = new WebSitemapGenerator(baseUrl, siteMapXmlDir);
            System.out.println("writing xml");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        try {
            List<Category> categoryList =  categoryRepository.findAll();
            for(Category category: categoryList){
                wsg.addUrl("http://www.qqsport.mycloud.by/#!readcat/" + category.getId()); // repeat multiple times
            }


            List<News> newsList =  newsRepository.findAll();
            for(News news: newsList){
                wsg.addUrl("http://www.qqsport.mycloud.by/#!readnews/" + news.getId()); // repeat multiple times
            }
            System.out.println("add url");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        if(wsg != null){
            wsg.write();
            wsg.writeSitemapsWithIndex();
        }

        System.out.println("job complite");

        pingGoogle(baseUrl+"sitemap.xml");
        pingGoogle(baseUrl+"sitemap_index.xml");

    }

    /**
     * Ping Google that sitemap has changed. Will call this URL:
     * http://www.google.com/webmasters/tools/ping?sitemap=<URL Encoded
     * sitemapUrl>
     *
     */
    public void pingGoogle(String sitemapUrl) {
        try {
            String pingUrl = "http://www.google.com/webmasters/tools/ping?sitemap=" + URLEncoder.encode(sitemapUrl, "UTF-8");
            System.out.println("Will ping this URL: " + pingUrl);
            // ping Google

            HttpClient client = HttpClientBuilder.create().build();
            HttpGet request = new HttpGet(pingUrl);

            HttpResponse response = client.execute(request);

            int returnCode = response.getStatusLine().getStatusCode();
            if (returnCode != 200) {
                System.out.println("Google could not be informed about new sitemap!");
            }
            System.out.println(response);
        } catch (Exception ex) {
            System.out.println("Google could not be informed about new sitemap!");
        }
    }

    /**
     * Ping Google that sitemap has changed. Sitemap must be on this location:
     * baseUrl/sitemap.xml (for example http://www.javavids.com/sitemap.xml)
     */


    public static void main(String[] args) throws SchedulerException {
        System.out.println("checks sitemap generator");

        try {
            final Scheduler sched = new StdSchedulerFactory().getScheduler();
            JobDetail job = JobBuilder.newJob(SiteMapXmlGeneratorJob.class).withIdentity(
                    "trigger1", "group1").build();

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("trigger1", "group1")
                    .startNow()
                    .withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInMinutes(1440) /*each day 60*24 */
                            .repeatForever()).build();
            sched.scheduleJob(job, trigger);
            sched.start();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }

}
