package kz.qsport;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.data.rest.webmvc.RepositoryRestExporterServlet;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.DispatcherType;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

import javax.servlet.FilterRegistration;

import org.springframework.web.filter.DelegatingFilterProxy;

/**
 * Spring Web configuration in replacement for web.xml.
 * It's a Spring overlay for the new Servlet 3.0 Java configuration.
 * By implementing WebApplicationInitializer, Spring will automatically call this class as web application configuration
 */
public class WebConfig implements WebApplicationInitializer {
    /**
     * Initialize web application by instantiating Spring context, Spring Data Rest Servlet and Spring MVC dispatcher.
     *
     * @param container
     */
    @Override
    public void onStartup(ServletContext container) {
        // Create the 'root' Spring application context
        AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
        applicationContext.register(ApplicationConfig.class);

        // Manage the lifecycle of the root application context
        container.addListener(new ContextLoaderListener(applicationContext));

        /*FilterRegistration.Dynamic filterMultipartResolver = container.addFilter("filterMultipartResolver", HiddenHttpMethodFilter.class);
        filterMultipartResolver.addMappingForUrlPatterns(null, false, "/rest/picture");
        filterMultipartResolver.setInitParameter("multipartResolverBeanName", "multipartResolver");*/

        // Add springSecurityFilterChain to the context
        FilterRegistration.Dynamic springSecurityFilterChain = container.addFilter("springSecurityFilterChain", DelegatingFilterProxy.class);
        springSecurityFilterChain.addMappingForUrlPatterns(null, false, "/*");

        FilterRegistration.Dynamic redirectFilterChain = container.addFilter("redirectFilterChain", RedirectFilter.class);
        redirectFilterChain.addMappingForUrlPatterns(null, false, "/*");

        FilterRegistration.Dynamic encodingFilter = container.addFilter("EncodingFilter", CharacterEncodingFilter.class);
        encodingFilter.setInitParameter("encoding", "UTF-8");
        encodingFilter.setInitParameter("forceEncoding", "true");
        encodingFilter.addMappingForUrlPatterns(null, false, "/*");

        // Register and map the dispatcher servlet
        DispatcherServlet servletDispatcher = new DispatcherServlet(applicationContext);
        ServletRegistration.Dynamic dispatcher = container.addServlet("dispatcher", servletDispatcher);
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/rest/*");

        // Register and map the data rest "exporter" servlet
        DispatcherServlet servletExporter = new RepositoryRestExporterServlet();
        ServletRegistration.Dynamic exporter = container.addServlet("exporter", servletExporter);
        exporter.setLoadOnStartup(1);
        exporter.addMapping("/data-rest/*");
    }
}
