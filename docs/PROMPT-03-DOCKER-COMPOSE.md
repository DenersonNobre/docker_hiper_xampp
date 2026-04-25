# PROMPT 03 - Docker Compose

## Contexto

O docker-compose.yml orchestra o container e configura portas, volumes nomeados e restart policy.

## Tarefa

### Criar docker-compose.yml:

```yaml
services:
  super-xampp:
    build: .
    image: dnoi/super-xampp:1.0.0    
    container_name: super_xampp
    restart: always
    ports:
      - "80:80"       # Apache
      - "3306:3306"   # MySQL
      - "8080:8080"  # Tomcat
      - "3000:3000"  # Node.js
    volumes:
      - mysql_data:/var/lib/mysql
      - htdocs:/var/www/html

volumes:
  mysql_data:
  htdocs:
```

## Volumes Nomeados

| Volume | Destino | Descrição |
|--------|--------|----------|
| mysql_data | /var/lib/mysql | Dados MySQL |
| htdocs | /var/www/html | Arquivos web |

Os volumes nomeados aparecem no Docker Desktop.

## Portas Escolhidas

| Porta | Serviço | Rationale |
|-------|---------|-----------|
| 80 | Apache | Padrão HTTP |
| 3306 | MySQL | Padrão MySQL (permitir Workbench) |
| 8080 | Tomcat | Alternativa à 8000 (evita conflito) |
| 3000 | Node.js | Porta não-root comum |

## Verificação

```bash
docker-compose config
# Deve mostrar configuração sem erros
```

Verificar volumes:
```bash
docker volume ls
# super_xampp_htdocs
# super_xampp_mysql_data
```

## Próximo Passo

Ver [PROMPT-04-SUPERVISOR.md](PROMPT-04-SUPERVISOR.md)