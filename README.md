<div class="status-bar" style="text-align: center;"> 🛠 Projeto em construção 🛠... </div>

# User Point Control

This project is a backend API built with NestJS that allows users to "clock in" and have a history of hours worked.

# 📑 Table of Contents

1.  [Technologies Used](#technologies-used)
2.  [Setup and Installation](#setup-and-installation)
3.  [Project Structure](#project-structure)
4.  [Tests](#tests)
5.  [License](#license)
6.  [Author](#author)


<h1 id="technologies-used">🛠 Technologies Used </h1>

- **NestJS** for backend framework
- **Swagger** for API Documentation
- **Jest** for test API
- **ReactJS/MUI** for frontend framework

---
<h1 id="setup-and-installation">⚙️ Setup and Installation </h1>

## Prerequisites

- Node.js: https://nodejs.org/pt/download
- Nesj.js: https://docs.nestjs.com
- React.js
- pnpm: npm install -g pnpm@latest-10

## Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/igorttosta/Point-Control.git
    ```
2. **Install dependencies:**
    ```bash
    pnpm install
    ```
3. **Start docker-compose:**
    ```bash
    docker compose up
    ```
4. **Build migration database:**
    ```bash
    pnpm run build
    ```
5. **Run migration database:**
    ```bash
    npx typeorm migration:run -d dist/database/orm-cli-config.js
    ```
6. **Start the aplication**
    ```bash
    pnpm run start:dev
    ```

<h1 id="project-structure">📂 Project Structure </h1>

```bash
    ├── src
    │   ├── controller
    │   │   ├── app.controller.ts
    │   │   ├── hour.controller.ts
    │   │   ├── user.controller.ts
    │   │
    │   ├── database
    │   │   ├── database.module.ts
    │   │   ├── orm-cli-config.ts
    │   │
    │   ├── dto
    │   │   ├── create-hour.dto.ts
    │   │   ├── create-user.dto.ts
    │   │
    │   ├── entities
    │   │   ├── hour.entity.ts
    │   │   ├── user.entity.ts
    │   │
    │   ├── migration
    │   │   ├── CreateUserTable.ts
    │   │   ├── CreateHourTable.ts
    │   │   ├── CreateUserFkHourTable.ts
    │   │
    │   ├── modules
    │   │   ├── app.module.ts
    │   │   ├── user.module.ts
    │   │   ├── hour.module.ts
    │   │
    │   ├── service
    │   │   ├── app.service.ts
    │   │   ├── user.service.ts
    │   │   ├── hour.service.ts
    │   │
    │   ├── main.ts
    │
    ├── test
    │   ├── hour
    │   │   ├── hours.service.spec.ts
    │   ├── user
    │   │   ├── users.service.spec.ts
    │   
    └── README.md
 ```

<h1 id="technologies-used">🧑‍💻 Tests </h1>

    ```bash
    npm test
    ```

<h1 id="license">📜 License </h1>

Distributed under the MIT License. See `LICENSE` for more information.

<h1 id="author">✒️ Author </h1>

Made by **Igor T Matos**. For more information: my [LinkedIn](https://www.linkedin.com/in/matos-igor-tosta/)