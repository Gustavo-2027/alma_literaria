import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, LoaderCircle } from "lucide-react";

import useTheme from "../../features/theme/model/useTheme";
import { useToast } from "../../features/toast/model/ToastContext";
import { signUpWithEmail } from "../../features/auth/api/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { showToast } = useToast();

  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        ? "bg-white text-black hover:opacity-85 disabled:opacity-60"
        : "bg-black text-white hover:opacity-85 disabled:opacity-60",
      errorBox: darkMode
        ? "border-red-900 bg-red-950 text-red-300"
        : "border-red-200 bg-red-50 text-red-600",
    };
  }, [darkMode]);

  function focusFirstField() {
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 0);
  }

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      focusFirstField();
      return;
    }

    if (name.length < 2) {
      setError("Digite um nome válido.");
      focusFirstField();
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      focusFirstField();
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      focusFirstField();
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const { data, error: authError } = await signUpWithEmail({
        email,
        password,
        fullName: name,
      });

      if (authError) {
        const message = authError.message?.toLowerCase() ?? "";

        if (authError.status === 429 || message.includes("rate limit")) {
          setError(
            "Muitas tentativas em pouco tempo. Aguarde alguns minutos antes de tentar novamente."
          );
          focusFirstField();
          return;
        }

        if (
          message.includes("already") ||
          message.includes("registered") ||
          message.includes("exists")
        ) {
          setError("Este email já está registrado.");
          focusFirstField();
          return;
        }

        setError("Não foi possível criar a conta. Tente novamente.");
        focusFirstField();
        return;
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      showToast({
        title: "Conta criada",
        description: data?.session
          ? "Sua conta foi criada com sucesso."
          : "Verifique seu email para confirmar a conta.",
        actionLabel: data?.session ? "Ir para home" : "Ir para login",
        actionTo: data?.session ? "/home" : "/",
        duration: 3200,
      });

      if (data?.session) {
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch {
      setError("Ocorreu um erro ao criar a conta. Tente novamente.");
      focusFirstField();
    } finally {
      setIsSubmitting(false);
    }
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
                Crie sua conta e inicie sua jornada literária.
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
                <form
                  className="flex flex-col gap-8"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                    >
                      Nome
                    </label>

                    <input
                      ref={nameInputRef}
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
                    <div
                      className={`border px-4 py-3 text-sm leading-relaxed ${theme.errorBox}`}
                      role="alert"
                    >
                      <p>{error}</p>

                      {error.toLowerCase().includes("muitas tentativas") ? (
                        <p className="mt-2 text-xs opacity-80">
                          Se você estiver testando várias contas seguidas,
                          aguarde alguns minutos ou ajuste a configuração de
                          email no Supabase.
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-disabled={isSubmitting}
                      className={`inline-flex min-h-[56px] w-full items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] transition sm:w-auto sm:min-w-[240px] sm:px-10 ${
                        theme.button
                      } ${isSubmitting ? "pointer-events-none opacity-70" : ""}`}
                    >
                      {isSubmitting ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          Criar conta
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div
                  className={`mt-10 flex flex-col gap-4 border-t pt-6 text-[11px] uppercase tracking-[0.22em] sm:flex-row sm:items-center sm:justify-between ${theme.border}`}
                >
                  <Link to="/" className={`transition ${theme.link}`}>
                    Já tenho conta
                  </Link>

                  <Link to="/catalogo" className={`transition ${theme.link}`}>
                    Explorar catálogo
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