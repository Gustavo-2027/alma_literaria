import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { LogIn } from "lucide-react";
import useDarkModeContext from "../hooks/useDarkModeContext";
import { setUser } from "../redux/slices/cartSlice";
import { userInformations } from "../components/Users";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkModeContext();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setErro("As senhas não coincidem");
      return;
    }

    const userExists = userInformations.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setErro("Este email já está registrado");
      return;
    }

    const id = Math.floor(Math.random() * 20000);

    userInformations.push({ id, name, email, password });
    dispatch(login({ email }));
    dispatch(setUser({ email }));
    navigate("/home");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErro("");
  }

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full py-4 px-4 sm:px-8 lg:px-12 shadow-md z-10 ${
          darkMode
            ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
            : "bg-black text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <h1 className="text-2xl font-light uppercase tracking-wider">
            Alma Literária
          </h1>
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen pt-20">
        <section className="w-full max-w-md rounded-lg shadow-2xl shadow-gray-800 p-8 bg-gray-100">
          <div className="text-center mb-8">
            <h2
              id="register-heading"
              className="text-3xl font-light uppercase tracking-wider text-black"
            >
              Registro
            </h2>
            <p className="text-lg font-light text-gray-600 mt-2">
              Crie sua conta na Alma Literária
            </p>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-light uppercase tracking-wide text-gray-600"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-base font-light text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                aria-label="Digite seu nome"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-light uppercase tracking-wide text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-base font-light text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                aria-label="Digite seu email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-light uppercase tracking-wide text-gray-600"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-base font-light text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                aria-label="Digite sua senha"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="text-sm font-light uppercase tracking-wide text-gray-600"
              >
                Confirmar Senha
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-base font-light text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                aria-label="Confirme sua senha"
                required
              />
            </div>
            {erro && (
              <p
                id="form-error"
                className="text-red-600 text-sm font-light text-center bg-red-100 py-2 rounded-lg"
                role="alert"
              >
                {erro}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 cursor-pointer"
              aria-label="Criar conta"
            >
              <LogIn className="w-4 h-4" />
              Criar Conta
            </button>
          </form>

          <div className="flex justify-center items-center mt-6 text-sm font-light uppercase tracking-wide text-gray-600 cursor-pointer">
            <Link
              to="/"
              className="hover:text-black hover:border-b border-black transition-colors"
              aria-label="Já tenho uma conta"
            >
              Já tenho conta
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
