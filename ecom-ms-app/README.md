# ecom-ms-app

Application microservices : clients, produits, factures.

| Module | Port |
|---|---|
| discovery-service (Eureka) | 8761 |
| config-service | 9999 |
| customer-service | 8081 |
| inventory-service | 8082 |
| billing-service | 8083 |
| gateway-service | 8888 |
| ecom-web-app (Angular) | 4200 |

## Ordre de démarrage
1. discovery-service
2. config-service (working directory = racine du projet, car il lit `config-repo/`)
3. customer-service, inventory-service, billing-service
4. gateway-service
5. ecom-web-app : `cd ecom-web-app && npm install && npm start`

## Config-repo
```
cd config-repo
git init
git add .
git commit -m "Initial config"
git branch -M main
```
