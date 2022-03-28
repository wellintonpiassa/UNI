# Executando o backend localmente
1. Prepare uma instância do PostgreSQL.
2. `yarn install`
3. `POSTGRES_HOST=$HOST POSTGRES_DB=$DATABASE POSTGRES_USER=$USER POSTGRES_PASSWORD=$PASSWORD yarn start`

# Executando o backend usando Docker Compose
1. Crie um arquivo .env com base no arquivo .env.example.
2. Defina as variáveis necessárias no arquivo .env.\
2.1.  Defina a variável de ambiente POSTGRES_HOST como 'uni-postgres'
3. `docker-compose up`

