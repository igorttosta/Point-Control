# Point Control

API REST de controle de ponto: o usuário registra entrada, pausa, retorno e saída de cada dia e mantém o histórico de horas trabalhadas.

## Funcionalidades

- Cadastro de usuário com CPF único e senha com hash `bcrypt`
- Login por CPF e senha, que devolve um token JWT
- Abertura do registro de ponto de cada dia
- Marcação de pausa, retorno e saída ao longo do dia, junto com o total de horas
- Regras de negócio validadas na API: não permite abrir de novo um dia já encerrado, nem encerrar duas vezes o mesmo dia, e só aceita a alteração dos campos de horário

## Destaques técnicos

- **NestJS em camadas**: controllers, services, DTOs e entidades separados por responsabilidade
- **Validação de entrada** com `class-validator` e `ValidationPipe` global, que rejeita campos fora do DTO (`whitelist` e `forbidNonWhitelisted`)
- **TypeORM com migrations versionadas**, sem `synchronize` automático do schema
- **PostgreSQL em Docker** para o ambiente local
- **Testes unitários com Jest** para os services de usuário e de horas

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/users` | Cria um usuário |
| `GET` | `/users/:id` | Busca um usuário |
| `POST` | `/users/login` | Faz login e retorna o token JWT |
| `POST` | `/hours/:userId` | Abre o registro de ponto do dia |
| `PUT` | `/hours/:userId/:relevant_day` | Registra pausa, retorno ou saída do dia (`relevant_day` no formato `AAAA-MM-DD`) |

## Stack

- NestJS 10 e TypeScript
- TypeORM e PostgreSQL
- Passport e JWT
- Jest
- Docker

## Como rodar

Pré-requisitos: Node.js 18 ou superior, pnpm e Docker.

```bash
git clone https://github.com/igorttosta/Point-Control.git
cd Point-Control
pnpm install

# Sobe o PostgreSQL
docker compose up -d

# Compila e aplica as migrations
pnpm run build
npx typeorm migration:run -d dist/database/orm-cli-config.js

# Inicia a API em modo de desenvolvimento
pnpm run start:dev
```

A API fica disponível em [http://localhost:3000](http://localhost:3000).

## Testes

```bash
pnpm test
```

## Estrutura

```
src/
  controller/   Rotas de usuários e de horas
  service/      Regras de negócio
  dto/          Validação dos dados de entrada
  entities/     Entidades do TypeORM (User, Hour)
  migration/    Migrations do banco
  modules/      Módulos do NestJS e estratégia JWT
  database/     Configuração da conexão com o PostgreSQL
test/           Testes unitários dos services
```

## Próximos passos

- [ ] Calcular o total de horas na própria API, a partir dos horários registrados
- [ ] Proteger as rotas de horas com o JWT
- [ ] Ler as credenciais do banco e o segredo do JWT de variáveis de ambiente
- [ ] Documentação da API com Swagger
- [ ] Frontend em React com MUI, a partir do [protótipo no Figma](https://www.figma.com/design/qjvh3WoOo0X3doftAy7CSy/Point-Control?node-id=0-1&p=f&t=fLpV7KfxsjWhCqkp-0)

## Autor

Feito por **Igor Tosta** · [LinkedIn](https://www.linkedin.com/in/matos-igor-tosta/) · [GitHub](https://github.com/igorttosta)
