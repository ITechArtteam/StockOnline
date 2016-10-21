package com.itechart.config;

import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Import({RepositoryConfig.class})
@Configuration
@ComponentScan("com.itechart")
@PropertySource("classpath:application.properties")
public class RootConfig {

    @Bean
    public static PropertySourcesPlaceholderConfigurer configurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}

