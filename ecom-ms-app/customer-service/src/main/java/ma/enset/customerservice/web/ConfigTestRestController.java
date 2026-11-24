package ma.enset.customerservice.web;

import ma.enset.customerservice.config.CustomerConfigParams;
import ma.enset.customerservice.config.GlobalConfigParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RefreshScope
public class ConfigTestRestController {

    @Value("${global.params.p1:0}")
    private int p1;
    @Value("${global.params.p2:0}")
    private int p2;
    @Value("${customer.params.x:0}")
    private int x;
    @Value("${customer.params.y:0}")
    private int y;

    private final GlobalConfigParams globalConfigParams;
    private final CustomerConfigParams customerConfigParams;

    public ConfigTestRestController(GlobalConfigParams globalConfigParams,
                                    CustomerConfigParams customerConfigParams) {
        this.globalConfigParams = globalConfigParams;
        this.customerConfigParams = customerConfigParams;
    }

    @GetMapping("/testConfig1")
    public Map<String, Integer> testConfig1() {
        return Map.of("p1", p1, "p2", p2, "x", x, "y", y);
    }

    @GetMapping("/testConfig2")
    public Map<String, Object> testConfig2() {
        return Map.of("globalParams", globalConfigParams, "customerParams", customerConfigParams);
    }
}
