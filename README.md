- Instalar o KNEX de forma global
    - npm install knex -g

- Configurar o arquivo .env
    - Mudar nome da base de dados
    - Credencias do banco de dados
    - Criar encode key para JWT

- Rodar os comandos parar usar as migrations e criar as tabelas e inserir alguns dados 
    - knex migrate:latest
    - knex seed:run

- Comandos uteis Knex - (http://knexjs.org/)
    - Criar migration: knex migrate:make migration_name 
    - Criar seeds: knex seed:make seed_name
