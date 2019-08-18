### Docker setup:
docker run --name my-postgres -e POSTGRES_PASSWORD=sa123456 -e POSTGRES_USER=sa -e POSTGRES_DB=master -p 5432:5432 -d postgres

### Envs:
- DATABASE_URL = postgres database url (not required)
- DATABASE_SSL = true/false (not required)
- PORT = port number (not required)
- STEAM_KEY = your steam key (required)
