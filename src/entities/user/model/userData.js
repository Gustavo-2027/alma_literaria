/* =========================
   TYPES (MENTAL MODEL)
========================= */
// User = {
//   id: number,
//   name: string,
//   email: string,
//   passwordHash: string,
//   role?: "user" | "admin",
//   createdAt?: string
// }

/* =========================
   MOCK USERS (DEV ONLY)
========================= */
export const userInformations = [
  {
    id: 2025,
    name: "Usuário Teste",
    email: "teste@teste.com",
    passwordHash: "123456", // ⚠️ apenas mock (nunca usar assim em produção)
    role: "user",
    createdAt: "2025-01-01",
  },
  {
    id: 2027,
    name: "Gustavo Silva",
    email: "gustavo@teste.com",
    passwordHash: "123456", // ⚠️ mock
    role: "admin",
    createdAt: "2025-01-01",
  },
];