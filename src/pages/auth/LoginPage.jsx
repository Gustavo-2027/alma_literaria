import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, LoaderCircle } from "lucide-react";

import { clearUser, setUser } from "../../entities/cart/model/cartSlice";
import useTheme  from "../../features/theme/model/useTheme";
import { useToast } from "../../features/toast/model/ToastContext";
import { signInWithEmail } from "../../features/auth/api/authService";

import bannerImage from "../../shared/assets/img/BannerLogin.jpg";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { showToast } = useToast();

  const normalizedEmail = form.email.trim().toLowerCase();
  const normalizedPassword = form.password.trim();

  const styles = useMemo(() => {
    return {
      page: darkMode ? "bg-black text-white" : "bg-white text-black",
      surface: darkMode ? "bg-black text-white" : "bg-white text-black",
      eyebrow: darkMode ? "text-zinc-500" : "text-zinc-400",
      body: darkMode ? "text-zinc-400" : "text-zinc-500",
      input: darkMode
        ? "border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white"
        : "border-zinc-300 text-black placeholder:text-zinc-400 focus:border-black",
      primaryButton: darkMode
        ? "bg-white text-black hover:opacity-85 disabled:opacity-60"
        : "bg-black text-white hover:opacity-85 disabled:opacity-60",
      secondaryButton: darkMode
        ? "border-white text-white hover:bg-white hover:text-black"
        : "border-black text-black hover:bg-black hover:text-white",
      divider: darkMode ? "border-zinc-800" : "border-zinc-200",
      subtleAction: darkMode
        ? "text-zinc-500 hover:text-white"
        : "text-zinc-500 hover:text-black",
      errorBox: darkMode
        ? "border-red-900 bg-red-950 text-red-300"
        : "border-red-200 bg-red-50 text-red-600",
    };
  }, [darkMode]);

  function resetForm() {
    setForm({
      email: "",
      password: "",
    });
    setError("");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!normalizedEmail || !normalizedPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const { data, error: authError } = await signInWithEmail({
        email: normalizedEmail,
        password: normalizedPassword,
      });

      if (authError) {
        setError("Email ou senha inválidos.");
        return;
      }

      const loggedUser = data?.user ?? data?.session?.user;

      if (!loggedUser) {
        setError("Não foi possível iniciar a sessão.");
        return;
      }

      clearUser();
      setUser({ email: loggedUser.email });

      resetForm();

      showToast({
        title: "Login realizado",
        description: "Bem-vindo de volta à Alma Literária.",
        duration: 2600,
      });

      navigate("/home");
    } catch {
      setError("Ocorreu um erro ao entrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLoginWithoutAccount() {
    navigate("/catalogo");
  }

  function handleForgotPassword() {
    showToast({
      title: "Em desenvolvimento",
      description: "A recuperação de senha estará disponível em breve.",
      duration: 2800,
    });
  }

  return (
    <main className={`min-h-screen ${styles.page}`}>
      <div className="flex min-h-screen">
        <section className="hidden h-screen md:relative md:block md:w-[60%]">
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
        </section>

        <section
          className={`flex w-full items-center justify-center px-6 py-12 sm:px-10 md:w-[40%] lg:px-16 ${styles.surface}`}
          aria-label="Área de autenticação"
        >
          <div className="w-full max-w-md">
            <header className="mb-14">
              <p
                className={`mb-3 text-[11px] uppercase tracking-[0.32em] ${styles.eyebrow}`}
              >
                Acesso
              </p>

              <h1 className="text-3xl font-light uppercase tracking-[0.18em] sm:text-4xl">
                Login
              </h1>

              <p className={`mt-4 text-sm leading-7 ${styles.body}`}>
                Entre para acessar sua experiência na Alma Literária.
              </p>
            </header>

            <form
              className="flex flex-col gap-7"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Digite seu email"
                  value={form.email}
                  onChange={handleInputChange}
                  className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${styles.input}`}
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
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
                  name="password"
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  value={form.password}
                  onChange={handleInputChange}
                  className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition ${styles.input}`}
                  autoComplete="current-password"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                />
              </div>

              {error ? (
                <p
                  id="login-error"
                  className={`border px-4 py-3 text-sm ${styles.errorBox}`}
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-3 inline-flex min-h-[54px] w-full items-center justify-center gap-2 text-xs uppercase tracking-[0.26em] transition ${styles.primaryButton}`}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <button
              type="button"
              onClick={handleLoginWithoutAccount}
              className={`mt-4 inline-flex min-h-[54px] w-full items-center justify-center gap-2 border text-xs uppercase tracking-[0.26em] transition ${styles.secondaryButton}`}
            >
              <LogIn className="h-4 w-4" />
              Explorar catálogo
            </button>

            <div
              className={`mt-10 flex flex-col gap-4 border-t pt-6 text-[11px] uppercase tracking-[0.22em] sm:flex-row sm:items-center sm:justify-between ${styles.divider}`}
            >
              <button
                type="button"
                onClick={handleForgotPassword}
                className={`cursor-pointer text-left transition ${styles.subtleAction}`}
              >
                Esqueci minha senha
              </button>

              <Link
                to="/register"
                className={`cursor-pointer transition ${styles.subtleAction}`}
              >
                Criar conta
              </Link>
            </div>

            <Link
              to="/home"
              className={`mt-8 inline-flex text-[11px] uppercase tracking-[0.22em] transition ${styles.subtleAction}`}
            >
              Voltar para a loja
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}