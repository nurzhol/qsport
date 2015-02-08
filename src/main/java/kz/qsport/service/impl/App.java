package kz.qsport.service.impl;

import kz.qsport.SiteMapXmlGeneratorJob;
import kz.qsport.repository.CategoryRepository;
import kz.qsport.repository.NewsRepository;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * Created by yerganat on 2/7/15.
 */
@Service
public class App implements InitializingBean {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Override
    public void afterPropertiesSet() throws Exception {

        System.out.println("Post contstract job init");
        SiteMapXmlGeneratorJob.categoryRepository = categoryRepository;
        SiteMapXmlGeneratorJob.newsRepository = newsRepository;

        //Start sitemap.xml genrator
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
