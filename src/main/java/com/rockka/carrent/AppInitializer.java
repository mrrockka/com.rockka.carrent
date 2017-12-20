package com.rockka.carrent;

import com.rockka.carrent.config.AppConfig;
import com.rockka.carrent.config.MvcConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class AppInitializer implements WebApplicationInitializer{
    private final Logger logger = LoggerFactory.getLogger(AppInitializer.class);
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        logger.debug("APPINITIALIZER: Before registering app config");
        //      root context
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(AppConfig.class);
        //protip: don't use context.refresh() it's cause an exception with resourceHandler
        logger.debug("APPINITIALIZER: Before registering listener");
        servletContext.addListener(new ContextLoaderListener(rootContext));
        logger.debug("APPINITIALIZER: Before registering dispatcher config");
        //      dispatcher context
        AnnotationConfigWebApplicationContext dispatcherContext = new AnnotationConfigWebApplicationContext();
        dispatcherContext.register(MvcConfig.class);

        logger.debug("APPINITIALIZER: Before adding servlet");
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher",
                new DispatcherServlet(dispatcherContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }
}
