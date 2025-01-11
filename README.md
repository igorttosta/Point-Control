<div class="status-bar" style="text-align: center;"> 🛠 Projeto em construção 🛠... </div>

# User Registration with Document Verification

This project is a backend API built with NestJS that enables user registration with automated document verification using AWS services (Textract, S3, DynamoDB, and Lambda), along with email verification using AWS SES.

# 📑 Table of Contents

01. [Overview](#overview)
02. [Technologies Used](#technologies-used)
03. [Setup and Installation](#setup-and-installation)
04. [Project Structure](#project-structure)
05. [License](#license)
06. [Author](#author)

<h1 id="overview">📘 Overview </h1>

This system enables user registration with automatic data verification through OCR (Optical Character Recognition) on identity documents (e.g., ID cards, driver's licenses). It leverages AWS services for file storage, OCR, data validation, and database management.

<h1 id="technologies-used">🛠 Technologies Used </h1>

- **NestJS** for backend framework
- **ReactJS/MUI** for frontend framework

---
<h1 id="setup-and-installation">⚙️ Setup and Installation </h1>

## Prerequisites

- Node.js, Nesj.js and React.js
- Install Node: https://nodejs.org/pt/download
- Install Nest: https://docs.nestjs.com
- ```bash
    npm i -g @nestjs/cli
  ```

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

<h1 id="project-structure">📂 Project Structure </h1>

```bash
    ├── src
    │   ├── controller
    │   │   ├── app.controller.ts
    │   │   ├── user.controller.ts
    │   │
    │   ├── database
    │   │   ├── database.module.ts
    │   │
    │   ├── dto
    │   │   ├── create.user.dto.ts
    │   │
    │   ├── entities
    │   │   ├── hour.entity.ts
    │   │   ├── user.entity.ts
    │   │
    │   ├── migration
    │   │   ├── 
    │   │
    │   ├── modules
    │   │   ├── app.module.ts
    │   │   ├── user.module.ts
    │   │
    │   ├── service
    │   │   ├── app.service.ts
    │   │   ├── user.service.ts
    │   │
    │   ├── main.ts
    │
    └── README.md                     # Documentation for the project
 ```

<h1 id="license">📜 License </h1>

Distributed under the MIT License. See `LICENSE` for more information.

<h1 id="author">✒️ Author </h1>

Made by **Igor T Matos**. For more information: my [LinkedIn](https://www.linkedin.com/in/matos-igor-tosta/)