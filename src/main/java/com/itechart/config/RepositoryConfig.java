package com.itechart.config;


import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.OpenJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages = "com.itechart.dao")
@EnableTransactionManagement
@PropertySource("classpath:application.properties")
public class RepositoryConfig {

    @Value("${jdbc.driverClassName}")
    private String driverClassName;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;
    @Value("${openjpa.Log}")
    private String openjpaLog;
    @Value("${openjpa.DynamicEnhancementAgent}")
    private boolean openjpaDynamicEnhancementAgent;
    @Value("${database}")
    private String database;
    @Value("${showSql}")
    private boolean showSql;
    @Value("${generateDdl}")
    private boolean generateDdl;
    @Value("${databasePlatform}")
    private String databasePlatform;

    @Bean(name = "dataSource", destroyMethod = "close")
    public BasicDataSource getDataSource() {
        BasicDataSource ds = new BasicDataSource();
        ds.setDriverClassName(driverClassName);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        return ds;
    }

    @Bean
    public Properties getJpaProperties() {
        Properties properties = new Properties();
        properties.put("openjpa.Log", openjpaLog);
        properties.put("openjpa.DynamicEnhancementAgent", openjpaDynamicEnhancementAgent);
        return properties;
    }

    @Bean
    public OpenJpaVendorAdapter getOpenJpaVendorAdapter(){
        OpenJpaVendorAdapter vendor = new OpenJpaVendorAdapter();
        vendor.setDatabase(Database.valueOf(database));
        vendor.setShowSql(showSql);
        vendor.setGenerateDdl(generateDdl);
        vendor.setDatabasePlatform(databasePlatform);
        return vendor;
    }

    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean getManagerFactoryBean(){
        LocalContainerEntityManagerFactoryBean managerFactoryBean
                = new LocalContainerEntityManagerFactoryBean();
        managerFactoryBean.setDataSource(getDataSource());
        managerFactoryBean.setJpaProperties(getJpaProperties());
        managerFactoryBean.setPackagesToScan("com.itechart.domain");
        managerFactoryBean.setJpaVendorAdapter(getOpenJpaVendorAdapter());
        return managerFactoryBean;
    }

    @Bean(name = "transactionManager")
    public JpaTransactionManager getTransactionManager(){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(getManagerFactoryBean().getNativeEntityManagerFactory());
        return transactionManager;
    }
}
