# Super XAMPP

Ambiente Docker completo de desenvolvimento com Apache, MySQL, Node.js, Tomcat e phpMyAdmin em um único container.

## Serviços

| Serviço | Porta | URL | Credenciais |
|---------|-------|-----|-------------|
| Apache | 80 | http://localhost | - |
| MySQL | 3306 | localhost:3306 | root/root |
| Node.js API | 3000 | http://localhost:3000 | - |
| Tomcat | 8080 | http://localhost:8080 | - |
| phpMyAdmin | - | http://localhost/phpmyadmin | root/root |

## Quick Start

```bash
# Build e run
docker-compose up -d

# Parar
docker-compose down
```

## Volumes

O projeto usa volumes nomeados Docker:

| Volume | Destino | Descrição |
|--------|--------|----------|
| `super_xampp_htdocs` | /var/www/html | Arquivos web (Apache) |
| `super_xampp_mysql_data` | /var/lib/mysql | Dados MySQL |

Os volumes são criados automaticamente pelo Docker Compose.

## Estrutura

```
super-xampp/
├── config/
│   ├── entrypoint.sh      # Script de inicialização
│   ├── my.cnf           # Configuração MySQL
│   └── supervisord.conf  # Gerenciador de processos
├── htdocs/
│   ├── super-xampp/     # Landing page
│   ├── materialize/     # Tema Materialize
│   └── server.js        # API Node.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Features

- **Apache 2** - Servidor web com PHP
- **MySQL 8** - Banco de dados com suporte a conexões remotas
- **Node.js 24** - API REST simples na porta 3000
- **Tomcat 11** - Servidor Java/JSP
- **phpMyAdmin** - Gerenciador visual de bancos

## Desenvolvimento

Os arquivos em `htdocs/` local são copiados para o volume na primeira vez.

```bash
# rebuild com novos arquivos
docker-compose down -v  # remove volumes
docker-compose build
docker-compose up -d
```

## API Endpoints

| Endpoint | Descrição |
|----------|----------|
| GET / | Página HTML |
| GET /api/status | Status da API |
| GET /api/time | Hora atual |
| GET /api/random | Número aleatório |

## Testes

```bash
# Verificar processos
docker exec super_xampp ps aux | grep -E "apache|mysql|node|java"

# Testar Apache
docker exec super_xampp curl http://localhost/

# Testar Node.js API
docker exec super_xampp curl http://localhost:3000/api/status

# Testar MySQL
docker exec super_xampp mysql -h 127.0.0.1 -u root -proot -e "SELECT 'OK'"
```

## Troubleshooting

### MySQL não inicia
```bash
docker logs super_xampp
```

### phpMyAdmin 404
```bash
docker exec super_xampp ls -la /var/www/html/phpmyadmin
```

### Reiniciar container
```bash
docker-compose down && docker-compose up -d
```

### Remover volumes (reset)
```bash
docker-compose down -v
```

## Tecnologias

- Ubuntu 22.04
- Apache 2
- MySQL 8
- Node.js 24.x
- Tomcat 11.x
- PHP 8.x
- OpenJDK 21
- Bootstrap 5

## Regras

1. **Todo desenvolvimento na branch `develop`**
2. Merge para `main` apenas em produção

```bash
git checkout develop
# fazer alterações
git add .; git commit -m "tipo: descrição"
git push origin develop
```

## CI/CD

GitHub Actions configurado em `.github/workflows/docker.yml`.

Ver [docs/CI-CD.md](docs/CI-CD.md) para configurar.