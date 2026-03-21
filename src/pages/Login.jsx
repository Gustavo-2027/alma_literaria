import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogIn } from "lucide-react";

import { login } from "../redux/slices/authSlice";
import { clearUser, setUser } from "../redux/slices/cartSlice";
import useDarkModeContext from "../hooks/useDarkModeContext";
import { useToast } from "../context/ToastContext";
import { userInformations } from "../data/Users";
import bannerImage from "../assets/img/BannerLogin.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkModeContext();
  const { showToast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const foundUser = userInformations.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === normalizedPassword
    );

    if (!foundUser) {
      setError("Email ou senha inválidos.");
      return;
    }

    dispatch(clearUser());
    dispatch(
      login({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      })
    );
    dispatch(setUser({ email: foundUser.email }));

    setEmail("");
    setPassword("");
    setError("");
    navigate("/home");
  }

  function handleLoginWithoutAccount() {
    navigate("/home");
  }

  function handleForgotPassword() {
    showToast({
      title: "Em desenvolvimento",
      description: "A recuperação de senha estará disponível em breve.",
      duration: 2800,
    });
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (error) setError("");
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    if (error) setError("");
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex min-h-screen">
        <div className="hidden h-screen md:relative md:block md:w-[60%]">
          <img
            src={bannerImage}
            alt="Ambiente editorial da Alma Literária"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-x-0 bottom-0 p-10 lg:p-14">
            <div className="max-w-xl text-white">
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/80">
                Alma Literária
              </p>
              <h2 className="text-3xl font-light uppercase leading-tight tracking-[0.18em] lg:text-5xl">
                Clássicos para quem aprecia elegância e profundidade.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/80 lg:text-base">
                Descubra obras atemporais em uma experiência de leitura mais
                sofisticada, limpa e inspiradora.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex w-full items-center justify-center px-6 py-12 sm:px-10 lg:px-16 md:w-[40%] ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="w-full max-w-md">
            <div className="mb-14">
              <p
                className={`mb-3 text-[11px] uppercase tracking-[0.32em] ${
                  darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Acesso
              </p>

              <h1 className="text-3xl font-light uppercase tracking-[0.18em] sm:text-4xl">
                Login
              </h1>

              <p
                className={`mt-4 text-sm leading-7 ${
                  darkMode ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Entre para acessar sua experiência na Alma Literária.
              </p>
            </div>

            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={handleChangeEmail}
                  className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${
                    darkMode
                      ? "border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white"
                      : "border-zinc-300 text-black placeholder:text-zinc-400 focus:border-black"
                  }`}
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                >
                  Senha
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={handleChangePassword}
                  className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${
                    darkMode
                      ? "border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white"
                      : "border-zinc-300 text-black placeholder:text-zinc-400 focus:border-black"
                  }`}
                  autoComplete="current-password"
                />
              </div>

              {error ? (
                <p
                  className={`border px-4 py-3 text-sm ${
                    darkMode
                      ? "border-red-900 bg-red-950 text-red-300"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className={`mt-3 inline-flex min-h-[54px] w-full items-center justify-center gap-2 text-xs uppercase tracking-[0.26em] transition ${
                  darkMode
                    ? "bg-white text-black hover:opacity-85"
                    : "bg-black text-white hover:opacity-85"
                }`}
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
            </form>

            <button
              type="button"
              onClick={handleLoginWithoutAccount}
              className={`mt-4 inline-flex min-h-[54px] w-full items-center justify-center gap-2 border text-xs uppercase tracking-[0.26em] transition ${
                darkMode
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Entrar sem conta
            </button>

            <div
              className={`mt-10 flex flex-col gap-4 border-t pt-6 text-[11px] uppercase tracking-[0.22em] sm:flex-row sm:items-center sm:justify-between ${
                darkMode ? "border-zinc-800" : "border-zinc-200"
              }`}
            >
              <button
                type="button"
                onClick={handleForgotPassword}
                className={`text-left transition ${
                  darkMode
                    ? "text-zinc-500 hover:text-white"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                Esqueci minha senha
              </button>

              <Link
                to="/register"
                className={`transition ${
                  darkMode
                    ? "text-zinc-500 hover:text-white"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                Criar conta
              </Link>
            </div>

            <Link
              to="/home"
              className={`mt-8 inline-flex text-[11px] uppercase tracking-[0.22em] transition ${
                darkMode
                  ? "text-zinc-500 hover:text-white"
                  : "text-zinc-500 hover:text-black"
                }`}
            >
              Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}