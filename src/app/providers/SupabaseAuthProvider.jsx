import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  clearAuth,
  setAuthLoading,
  setInitialized,
  setProfile,
  setSession,
} from "../../features/auth/model/authSlice";
import { clearUser, setUser as setCartUser } from "../../entities/cart/model/cartSlice";
import {
  getCurrentSession,
  onSupabaseAuthChange,
} from "../../features/auth/api/authService";
import { getProfileById, upsertProfile } from "../../integrations/supabase/profileService";

export default function SupabaseAuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    function resetAuthState() {
      dispatch(clearAuth());
      dispatch(clearUser());
      dispatch(setProfile(null));
    }

    function applySession(session) {
      dispatch(setSession(session));
      dispatch(
        setCartUser({
          email: session?.user?.email ?? null,
        })
      );
      dispatch(setInitialized(true));
      dispatch(setAuthLoading(false));
    }

    async function syncProfileFromSession(session) {
      try {
        const user = session?.user;

        if (!user) {
          dispatch(setProfile(null));
          return;
        }

        await upsertProfile({
          id: user.id,
          full_name: user.user_metadata?.full_name ?? "",
        });

        const { data: profileData } = await getProfileById(user.id);

        if (!isMounted) return;
        dispatch(setProfile(profileData ?? null));
      } catch {
        if (!isMounted) return;
        dispatch(setProfile(null));
      }
    }

    async function bootstrap() {
      try {
        dispatch(setAuthLoading(true));

        const { data, error } = await getCurrentSession();

        if (!isMounted) return;

        const session = data?.session ?? null;

        if (error || !session) {
          resetAuthState();
          return;
        }

        applySession(session);
        await syncProfileFromSession(session);
      } catch {
        if (!isMounted) return;
        resetAuthState();
      }
    }

    bootstrap();

    const subscription = onSupabaseAuthChange((event, session) => {
      if (!isMounted) return;

      if (!session) {
        resetAuthState();
        return;
      }

      applySession(session);

      window.setTimeout(() => {
        if (!isMounted) return;
        syncProfileFromSession(session);
      }, 0);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, [dispatch]);

  return children;
}