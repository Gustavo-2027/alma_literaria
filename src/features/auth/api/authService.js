import { supabase } from "../../../integrations/supabase/supabase";

function normalizeEmail(email) {
  return email?.trim().toLowerCase() ?? "";
}

function formatAuthError(error, fallbackMessage) {
  if (!error) return null;

  return {
    ...error,
    status: error.status ?? null,
    message: error.message ?? fallbackMessage,
  };
}

export async function signUpWithEmail({ email, password, fullName }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedName = fullName?.trim() ?? "";
  const normalizedPassword = password?.trim() ?? "";

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password: normalizedPassword,
    options: {
      data: {
        full_name: normalizedName,
      },
    },
  });

  return {
    data,
    error: formatAuthError(error, "Erro ao criar conta."),
  };
}

export async function signInWithEmail({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = password?.trim() ?? "";

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password: normalizedPassword,
  });

  return {
    data,
    error: formatAuthError(error, "Erro ao entrar."),
  };
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  return {
    error: formatAuthError(error, "Erro ao sair."),
  };
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  return {
    data,
    error: formatAuthError(error, "Erro ao obter sessão atual."),
  };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  return {
    data,
    error: formatAuthError(error, "Erro ao obter usuário atual."),
  };
}

export function onSupabaseAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  return data?.subscription ?? null;
}