# RentalX - Alugar Carros

Projeto desenvolvido no bootcamp Ignite da Rocketseat (trilha Node.js).

## Entidades

| Entidades | Atributos |
| - | - |
| cars | id, name, description, daily_rate, available, license_plate, brand_id, fine_amount, brand, created_at |
| categories | id, name, description, created_at |
| cars_image | id, car_id, image_name, created_at |
| specifications_cars | id, car_id, specification_id, created_at |
| specifications | id, name, description |
| rentals | id, car_id, user_id, start_date, end_date, expected_return_date, total, created_at, updated_at |
| users | id, name, username, password, email, driver_license, admin, created_at |

## Recursos

- Express
- Typescript
- Docker
- Docker Compose

## Iniciando o projeto

Após clonar o projeto, é necessário atualizar as dependências.

### Comandos para baixar dependências e iniciar a aplicação

```bash
yarn
yarn dev
```
### Executar a aplicação com o docker compose

```bash
docker-compose up
```
Ou

```bash
docker-compose up -d
```

Nota: para terminar a excução e excluir o container, executar o comando abaixo:

```bash
docker-compose down
```
