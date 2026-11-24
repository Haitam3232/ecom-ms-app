package ma.enset.inventoryservice;

import ma.enset.inventoryservice.entities.Product;
import ma.enset.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder().name("Computer").price(1200).quantity(11).build());
            productRepository.save(Product.builder().name("Printer").price(300).quantity(20).build());
            productRepository.save(Product.builder().name("Smartphone").price(900).quantity(35).build());
            productRepository.findAll().forEach(p -> System.out.println(p.getId() + " - " + p.getName()));
        };
    }
}
