package com.a703.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class FilterConfig {
//    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                .route(r -> r.path("/api/user/**")
                        .filters(f -> f.addRequestHeader("user-request", "user-request-header")
                                .addResponseHeader("user-response", "user-response-header"))
                        .uri("http://k7a703.p.ssafy.io:8080/"))
                .route(r -> r.path("/api/community/**")
                        .filters(f -> f.addRequestHeader("community-request", "community-request-header")
                                .addResponseHeader("community-response", "community-response-header"))
                        .uri("http://k7a703.p.ssafy.io:8081/"))
                .route(r -> r.path("/api/withdog/**")
                        .filters(f -> f.addRequestHeader("withdog-request", "withdog-request-header")
                                .addResponseHeader("withdog-response", "withdog-response-header"))
                        .uri("http://k7a703.p.ssafy.io:8082/"))
                .route(r -> r.path("/api/spot/**")
                        .filters(f -> f.addRequestHeader("spot-request", "spot-request-header")
                                .addResponseHeader("spot-response", "spot-response-header"))
                        .uri("http://k7a703.p.ssafy.io:8083/"))
                .build();
    }
}
