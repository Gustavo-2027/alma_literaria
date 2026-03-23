import { supabase } from "./supabase";

function formatProfileError(error, fallbackMessage) {
  if (!error) return null;

  return {
    ...error,
    status: error.status ?? null,
    message: error.message ?? fallbackMessage,
  };
}

export async function getProfileById(userId) {
  if (!userId) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return {
    data,
    error: formatProfileError(error, "Erro ao buscar perfil."),
  };
}

export async function upsertProfile(profile) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile)
    .select()
    .single();

  return {
    data,
    error: formatProfileError(error, "Erro ao salvar perfil."),
  };
}