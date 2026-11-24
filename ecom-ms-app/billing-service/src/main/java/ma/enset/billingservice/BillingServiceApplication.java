package ma.enset.billingservice;

import ma.enset.billingservice.entities.Bill;
import ma.enset.billingservice.entities.ProductItem;
import ma.enset.billingservice.repository.BillRepository;
import ma.enset.billingservice.repository.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillingServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(BillRepository billRepository, ProductItemRepository productItemRepository) {
        return args -> {
            Random random = new Random();
            // mêmes prix que ceux initialisés dans inventory-service (Computer, Printer, Smartphone)
            double[] unitPrices = {1200, 300, 900};
            for (long customerId = 1L; customerId <= 3L; customerId++) {
                Bill bill = billRepository.save(Bill.builder()
                        .billingDate(new Date())
                        .customerId(customerId)
                        .build());
                for (long productId = 1L; productId <= 3L; productId++) {
                    productItemRepository.save(ProductItem.builder()
                            .bill(bill)
                            .productId(productId)
                            .quantity(1 + random.nextInt(10))
                            .unitPrice(unitPrices[(int) productId - 1])
                            .build());
                }
            }
            System.out.println("=== " + billRepository.count() + " factures et "
                    + productItemRepository.count() + " lignes créées ===");
        };
    }
}
