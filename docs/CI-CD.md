# Super XAMPP - CI/CD com GitHub Actions

## Overview

O projeto usa GitHub Actions para build e push automático da imagem Docker para o Docker Hub.

## Workflow

`.github/workflows/docker.yml` executa:

1. **Build** - Compila a imagem Docker
2. **Push** - Envia para Docker Hub
3. **Test** - Verifica serviços

## Configuração

### Secrets necessários (GitHub → Settings → Secrets):

| Secret | Descrição |
|--------|----------|
| DOCKER_HUB_USERNAME | Usuário Docker Hub |
| DOCKER_HUB_TOKEN | Token de acesso Docker Hub |

### Como gerar token Docker Hub:

1. Acesse https://hub.docker.com/settings/security
2. New Access Token
3. Permissions: Read, Write, Delete

## Fluxo

```
develop push ──► Build test ──► Push develop tag
                            │
main push ────────────────────┘ (push latest)
```

## Run Manual

GitHub → Actions → Build and Push → Run workflow

## Verificar

```bash
docker pull denerson/super-xampp:latest
docker run -d -p 8080:80 denerson/super-xampp:latest
```