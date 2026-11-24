package ma.enset.customerservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "global.params")
public record GlobalConfigParams(int p1, int p2) {
}
