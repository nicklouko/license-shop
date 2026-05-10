# License Shop

> A modern full-stack software licensing platform designed for future integration with a native desktop application, built as a project for practice and skill development.

---

## Live Concept

A complete ecosystem where users can:

- Purchase software licenses on the web
- Authenticate securely
- Receive unique license keys instantly
- Download desktop app
- Redeem licenses in a future C# desktop application

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Architecture

```
React Frontend
      ↓
Express API
      ↓
Prisma ORM
      ↓
SQLite Database
```

### Future Expansion

```
C# Desktop App
      ↓
License Validation API
```

---

## Features

### Authentication

- JWT-based login system
- Secure password hashing with bcrypt

### Licensing System

- Product browsing
- License purchase flow
- Unique license key generation

### User System

- Account creation
- Personal dashboard with order history

### Backend

- REST API built with Express
- Prisma ORM
- Structured monorepo architecture

---

## Screenshots

### Register Page

<img width="1860" height="829" alt="image" src="https://github.com/user-attachments/assets/1a53a3b8-f20f-4dc1-8eb3-9e4fb9c9b65f" />

### Login Page

<img width="1859" height="831" alt="image" src="https://github.com/user-attachments/assets/c71c11b5-64c4-4d3a-b5d5-aa56d935e85d" />

### Product Page

<img width="1859" height="822" alt="image" src="https://github.com/user-attachments/assets/a2d310a0-e1be-45a7-b7ab-e15659ad9eb6" />

### Product details Page

<img width="1858" height="831" alt="image" src="https://github.com/user-attachments/assets/1178e809-6acc-44a6-b369-6ed3ffd1b7c2" />

### Dashboard

<img width="1859" height="822" alt="image" src="https://github.com/user-attachments/assets/70373e5d-49e9-4319-ba61-aa4a3239e912" />

---

## Project Structure

```
packages/
├── client/   → React frontend
├── server/   → Express backend
└── shared/   → Shared types (mostly used on frontend)
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nicklouko/license-shop.git
cd license-shop
npm install
```

---

### 2. Environment Setup

#### Server (`packages/server/.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

#### Client (`packages/client/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

### 3. Database Setup

```bash
cd packages/server
npx prisma generate
npx prisma migrate dev
npm run seed
cd ../..
```

---

### 4. Run Development Servers

```bash
npm run dev:server
npm run dev:client
```

---

## API Overview

### Auth

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /auth/register | Create account |
| POST   | /auth/login    | Login user     |

### Products

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /products     | Get all products |
| GET    | /products/:id | Get product      |

### Orders

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| POST   | /orders    | Create order    |
| GET    | /orders/me | Get user orders |

---

## Future Work

This project is designed as the foundation of a full software licensing ecosystem:

- Admin management panel
- Email delivery
- Pagination
- Breadcrumbs navigation
- UI improvement
- Native desktop redemption client (C#)

---
