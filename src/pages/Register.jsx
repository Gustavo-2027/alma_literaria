import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserPlus } from "lucide-react";

import { login } from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/cartSlice";
import useDarkModeContext from "../hooks/useDarkModeContext";
import { useToast } from "../context/ToastContext";
import { userInformations } from "../data/Users";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkModeContext();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const theme = useMemo(() => {
    return {
      page: darkMode ? "bg-black text-white" : "bg-white text-black",
      subtleText: darkMode ? "text-zinc-500" : "text-zinc-400",
      bodyText: darkMode ? "text-zinc-400" : "text-zinc-500",
      divider: darkMode ? "bg-zinc-800" : "bg-zinc-200",
      border: darkMode ? "border-zinc-800" : "border-zinc-200",
      link: darkMode
        ? "text-zinc-500 hover:text-white"
        : "text-zinc-500 hover:text-black",
      input: darkMode
        ? "border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white"
        : "border-zinc-300 text-black placeholder:text-zinc-400 focus:border-black",
      button: darkMode
        ? "bg-white text-black hover:opacity-85"
        : "bg-black text-white hover:opacity-85",
      errorBox: darkMode
        ? "border-red-900 bg-red-950 text-red-300"
        : "border-red-200 bg-red-50 text-red-600",
    };
  }, [darkMode]);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (name.length < 2) {
      setError("Digite um nome válido.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const userExists = userInformations.some(
      (user) => user.email.toLowerCase() === email
    );

    if (userExists) {
      setError("Este email já está registrado.");
      return;
    }

    const id = Date.now();

    userInformations.push({
      id,
      name,
      email,
      password,
    });

    dispatch(
      login({
        id,
        name,
        email,
      })
    );
    dispatch(setUser({ email }));

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");

    showToast({
      title: "Conta criada",
      description: "Sua conta foi criada com sucesso.",
      actionLabel: "Ir para a loja",
      actionTo: "/home",
      duration: 2800,
    });

    navigate("/home");
  }

  return (
    <div className={`min-h-screen ${theme.page}`}>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 sm:px-10 lg:px-16">
        <header
          className={`flex items-center justify-between border-b pb-6 ${theme.border}`}
        >
          <Link
            to="/"
            className="text-xl font-light uppercase tracking-[0.28em] transition hover:opacity-70"
          >
            Alma Literária
          </Link>

          <Link
            to="/"
            className={`text-[11px] uppercase tracking-[0.24em] transition ${theme.link}`}
          >
            Já tenho conta
          </Link>
        </header>

        <section className="flex flex-1 items-center justify-center py-12">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div className="flex flex-col justify-center">
              <p
                className={`mb-4 text-[11px] uppercase tracking-[0.32em] ${theme.subtleText}`}
              >
                Novo capítulo
              </p>

              <h1 className="max-w-xl text-4xl font-light leading-tight tracking-[0.08em] sm:text-5xl lg:text-6xl">
                Crie sua conta e comece sua jornada.
              </h1>

              <p
                className={`mt-8 max-w-lg text-sm leading-8 sm:text-base ${theme.bodyText}`}
              >
                Faça parte da Alma Literária e descubra uma experiência mais
                elegante para explorar clássicos, salvar favoritos e montar sua
                própria coleção.
              </p>

              <div className={`mt-10 h-px w-24 ${theme.divider}`} />

              <p
                className={`mt-10 max-w-md text-[11px] uppercase leading-6 tracking-[0.22em] ${theme.subtleText}`}
              >
                Leitura, curadoria e estética reunidas em uma única experiência.
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-full">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                    >
                      Nome
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${theme.input}`}
                      autoComplete="name"
                      required
                    />
                  </div>

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
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${theme.input}`}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
                        value={formData.password}
                        onChange={(event) =>
                          updateField("password", event.target.value)
                        }
                        className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${theme.input}`}
                        autoComplete="new-password"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                      >
                        Confirmar
                      </label>

                      <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={(event) =>
                          updateField("confirmPassword", event.target.value)
                        }
                        className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${theme.input}`}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>

                  {error ? (
                    <p
                      className={`border px-4 py-3 text-sm ${theme.errorBox}`}
                      role="alert"
                    >
                      {error}
                    </p>
                  ) : null}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`inline-flex min-h-[56px] w-full items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] transition sm:w-auto sm:min-w-[240px] sm:px-10 ${theme.button}`}
                    >
                      <UserPlus className="h-4 w-4" />
                      Criar conta
                    </button>
                  </div>
                </form>

                <div
                  className={`mt-10 flex flex-col gap-4 border-t pt-6 text-[11px] uppercase tracking-[0.22em] sm:flex-row sm:items-center sm:justify-between ${theme.border}`}
                >
                  <Link to="/" className={`transition ${theme.link}`}>
                    Já tenho conta
                  </Link>

                  <Link to="/home" className={`transition ${theme.link}`}>
                    Entrar sem conta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}