package kz.qsport;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import kz.qsport.repository.CategoryRepository;
import kz.qsport.repository.NewsRepository;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.Properties;

/**
 * This class replace the main Spring XML configuration file. There's a lot of annotations here, each one trigger Spring features.
 * "@Configuration" is the main annotation which trigger the class as a Spring configuration
 * "@ComponentScan" trigger Spring scanner to detect annotated beans in the project
 * "@ImportResource" Spring Security doesn't allow to be configured by Java code so the security configuration is imported as an XML file
 * "@EnableJpaRepositories" Trigger Spring Data JPA
 * "@EnableTransactionManagement" Trigger Spring transaction management
 */
@Configuration
@ComponentScan(basePackageClasses = ApplicationConfig.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class))
@ImportResource(value = {"classpath:META-INF/applicationContextSecurity.xml"})
@EnableJpaRepositories
@EnableTransactionManagement
@PropertySource("classpath:/db-config.properties")
public class ApplicationConfig {

    @Autowired
    private Environment env;

    /**
     * Bean definition for the HSQL DataSource
     *
     * @return DataSource bean
     */
    @Bean
    public DataSource dataSource() {
    /*EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
    return builder.setType(EmbeddedDatabaseType.H2).build();*/
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("dataSource.driverClass"));
        dataSource.setUrl(env.getProperty("dataSource.url"));
        //dataSource.setUrl("jdbc:mysql://"+System.getenv("OPENSHIFT_MYSQL_DB_HOST")+":"+System.getenv("OPENSHIFT_MYSQL_DB_PORT")+"/crmsystem");
        dataSource.setUsername(env.getProperty("dataSource.user"));
        dataSource.setPassword(env.getProperty("dataSource.password"));

        return dataSource;
    }

    /**
     * Bean definition for the EntityManagerFactory
     *
     * @return EntityManagerFactory bean
     */
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.H2);
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(Boolean.valueOf(env.getProperty("adapter.showsql")));

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan(getClass().getPackage().getName());
        factory.setDataSource(dataSource());

        Properties jpaProperties = new Properties();
        jpaProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
        jpaProperties.setProperty("hibernate.connection.SetBigStringTryClob", env.getProperty("hibernate.connection.SetBigStringTryClob"));
        factory.setJpaProperties(jpaProperties);


        return factory;
    }

    /**
     * Bean definition for the Spring Transaction Manager
     *
     * @return TransactionManager bean
     */
    @Bean
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return txManager;
    }

    @Bean(name = "javaMailSender")
    public JavaMailSenderImpl javaMailSender(){
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost("smtp.mail.ru");
        javaMailSender.setPort(465);
        javaMailSender.setUsername("qsportkz@mail.ru");
        javaMailSender.setPassword("qsportkz123");
        Properties mailProps = new Properties();
        mailProps.put("mail.transport.protocol", "smtp");
        mailProps.put("mail.smtp.auth", "true");
        mailProps.put("mail.smtp.starttls.enable", "false");
        mailProps.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        mailProps.put("mail.debug", "true");
        mailProps.put("mail.mime.charset", "UTF-8,");

        javaMailSender.setJavaMailProperties(mailProps);

        return  javaMailSender;

    }


    @Bean(name = "viewResolver")
    public InternalResourceViewResolver getViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }

}
