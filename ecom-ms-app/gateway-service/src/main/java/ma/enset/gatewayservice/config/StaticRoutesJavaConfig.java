package ma.enset.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Étapes 3/4 (variante Java) : routage statique.
 * Activer avec : --spring.profiles.active=static-java
 */
@Configuration
@Profile("static-java")
public class StaticRoutesJavaConfig {

    @Bean
    RouteLocator staticRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("r1", r -> r.path("/customers/**").uri("http://localhost:8081"))
                .route("r2", r -> r.path("/products/**").uri("http://localhost:8082"))
                .build();
    }
}
