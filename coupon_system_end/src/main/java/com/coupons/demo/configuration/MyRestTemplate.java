package com.coupons.demo.configuration;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class MyRestTemplate {
    /**
     * configuring the rest template
     * @param builder RestTemplateBuilder
     * @return rest template
     */
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder){
        return builder
                .setConnectTimeout(Duration.ofMillis(4_000))
                .setReadTimeout(Duration.ofMillis(4_000))
                .build();
    }
}
