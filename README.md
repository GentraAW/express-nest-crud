# Project Setup

## Deskripsi Proyek

Proyek ini adalah aplikasi yang dibangun menggunakan **Express**, **NestJS**, dan **ReactJS**. Aplikasi ini dirancang untuk mengelola data pelanggan, makanan, dan transaksi. Dengan menggunakan Prisma sebagai ORM, proyek ini memudahkan interaksi dengan database.

## Struktur Proyek

- **Backend**: Menggunakan NestJS dan Prisma untuk mengelola API dan database.
- **Frontend**: Menggunakan ReactJS dengan Vite untuk membangun antarmuka pengguna yang responsif.

## Setup Proyek

### 1. Express

Untuk memulai dengan Express, jalankan perintah berikut:

```bash
npm install express cors body-parser express-service
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
npx prisma generate
npx prisma migrate dev --name initial_migration
```

### 2. NestJS

Untuk mengatur NestJS, ikuti langkah-langkah berikut:

```bash
npm i -g @nestjs/cli
nest new nest-service
cd nest-service
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
npx prisma generate
npm install @nestjs/config
npm install class-validator class-transformer
npm install @nestjs/mapped-types
npm install date-fns-tz
npm install moment-timezone

# Generate resources
nest generate resource customers (dir: /src)
nest generate resource foods (dir: /src)
nest generate resource transactions (dir: /src)
```

### 3. React JS

Untuk memulai proyek React, gunakan perintah berikut:

```bash
npm create vite@latest react-js -- --template react
cd react-js
npm install
npm install @material-tailwind/react
npm install -D tailwindcss postcss autoprefixer axios react-router-dom formik yup
npx tailwindcss init -p
npm install lucide-react
npm install recharts
```

## Kegunaan

- **Express**: Framework minimalis untuk membangun aplikasi web dan API.
- **NestJS**: Framework untuk membangun aplikasi server-side yang efisien dan dapat diukur.
- **Prisma**: ORM yang memudahkan interaksi dengan database.
- **ReactJS**: Library untuk membangun antarmuka pengguna yang interaktif.
- **Tailwind CSS**: Framework CSS untuk membangun desain yang responsif dan modern.
- **Axios**: Library untuk melakukan permintaan HTTP.
- **Formik & Yup**: Untuk manajemen form dan validasi.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request atau buka isu untuk diskusi.
