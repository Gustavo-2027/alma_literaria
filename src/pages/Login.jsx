import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setErro("Por favor, preencha todos os campos");
      return;
    }
    if (email === "gustavo@teste.com" && password === "123456") {
      dispatch(login({ email, password }));
      navigate("/home");
      setEmail("");
      setPassword("");
      setErro("");
    } else {
      setErro("Email ou senha inválidos");
    }
  }

  return (
    <div className="min-w-full min-h-dvh h-full bg-zinc-300">
      <div className="flex justify-center items-center h-dvh">
        <section className="w-275 h-125 bg-zinc-100 rounded-md flex shadow-2xl shadow-zinc-500">
          <section className="bg-gradient-to-l from-zinc-800 to-zinc-900 text-white w-[50%] rounded-l shadow-2xl shadow-zinc-900 flex flex-col justify-center items-center gap-8 ">
            <h1 className="text-3xl font-black">CodifyStore</h1>
            <div>
              <h1 className="text-2xl font-extrabold ">
                Sua jornada começa aqui
              </h1>
              <p className="text-center text-zinc-200 pt-3">
                Tudo começa com um clique.
              </p>
            </div>
            <div className="flex flex-col juscjustify-center items-center gap-6">
              <button
                className="font-extrabold text- rounded-3xl px-4 py-3 border-2 cursor-pointer hover:scale-105 transition-transform "
                onClick={(e) => handleSubmit(e)}
              >
                Iniciar sessão
              </button>
              <p className="text-zinc-200">
                Esqueci minha{" "}
                <span className="font-semibold text-white hover:border-b transition-transform cursor-pointer">
                  senha
                </span>
                .
              </p>
            </div>
          </section>
          <section className="flex flex-col items-center  w-full py-12 gap-8">
            <div className="w-full">
              <h2 className="text-3xl text-gray-800 font-extrabold text-center pb-2">
                Login
              </h2>
              <h3 className="text-lg text-zinc-500 font-light text-center">
                Preencha seus dados
              </h3>
            </div>
            <form
              className="flex flex-col w-full justify-center items-center gap-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <label>
                <p className="font-extralight text-zinc-600 pb-1">Email</p>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-120 px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                ></input>
              </label>
              <label>
                <p className="font-extralight text-zinc-600 pb-1">Senha</p>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-120 px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all mb-5"
                ></input>
              </label>
              {erro && (
                <p
                  id="form-error"
                  className="text-red-500 text-sm text-center"
                  role="alert"
                >
                  {erro}
                </p>
              )}
              <button
                className="px-15 py-4 bg-zinc-900 text-zinc-200 text-xl font-bold rounded-2xl cursor-pointer hover:bg-zinc-700 duration-600"
                type="submit"
              >
                Entrar
              </button>
            </form>
          </section>
        </section>
      </div>
    </div>
  );
}
