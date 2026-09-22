# Adoption & Food Store

<img width="450" alt="picture of store" src="https://github.com/user-attachments/assets/9571c815-9136-4f35-a4b1-b8de8ca982ab" />

This is a full-stack TypeScript project for a Pet Adoption platform with a food shop, built with:
- Frontend: React + TypeScript + TailwindCSS (Vite)
- Backend: Node.js + Express + TypeScript
- Database: JSON files as a mock database (no external DB)

🖥️ Running the Project

1. Start the Backend (API)

```bash
cd src/api
npm install --save-dev ts-node-dev
npm run dev
```

 Runs on [http://localhost:4000](http://localhost:4000)

- Endpoints:
- GET /api/pets
- GET /api/products
- GET /api/users/:email
- POST /api/baskets/:userId
- …etc

2. Start the Frontend

```bash
cd src/client
npm install
npm run dev
```

Runs on [http://localhost:5173](http://localhost:5173)
