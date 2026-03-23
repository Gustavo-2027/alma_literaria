import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { user, loading, initialized } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading || !initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          Carregando
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}