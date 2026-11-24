package ma.enset.customerservice.config;

import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;

/**
 * Les records (immuables) sont reliés aux propriétés via le Binder et placés dans le scope "refresh" :
 * après POST /actuator/refresh, ils sont recréés avec les nouvelles valeurs.
 */
@Configuration
public class ConfigParamsBeans {

    @Bean
    @RefreshScope(proxyMode = ScopedProxyMode.NO)
    GlobalConfigParams globalConfigParams(Environment environment) {
        return Binder.get(environment).bindOrCreate("global.params", GlobalConfigParams.class);
    }

    @Bean
    @RefreshScope(proxyMode = ScopedProxyMode.NO)
    CustomerConfigParams customerConfigParams(Environment environment) {
        return Binder.get(environment).bindOrCreate("customer.params", CustomerConfigParams.class);
    }
}
