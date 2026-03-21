import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useDarkModeContext from "../hooks/useDarkModeContext";
import Toast from "../components/ui/Toast";

const ToastContext = createContext(null);

const DEFAULT_TOAST = {
  title: "Concluído",
  description: "",
  actionLabel: "",
  actionTo: "",
  icon: "success",
  duration: 3600,
};

const EXIT_DURATION = 240;

function normalizeToast(options) {
  if (typeof options === "string") {
    return {
      ...DEFAULT_TOAST,
      title: options,
    };
  }

  return {
    ...DEFAULT_TOAST,
    ...options,
  };
}

export function ToastProvider({ children }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkModeContext();

  const timeoutRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const startedAtRef = useRef(0);
  const remainingRef = useRef(0);

  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const clearMainTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const clearExitTimer = useCallback(() => {
    if (exitTimeoutRef.current) {
      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearMainTimer();
    clearExitTimer();
  }, [clearMainTimer, clearExitTimer]);

  const resetToastState = useCallback(() => {
    setToast(null);
    setVisible(false);
    setIsPaused(false);
    startedAtRef.current = 0;
    remainingRef.current = 0;
  }, []);

  const removeToastAfterExit = useCallback(() => {
    clearExitTimer();

    exitTimeoutRef.current = window.setTimeout(() => {
      resetToastState();
      exitTimeoutRef.current = null;
    }, EXIT_DURATION);
  }, [clearExitTimer, resetToastState]);

  const hideToast = useCallback(() => {
    setVisible(false);
    clearMainTimer();
    removeToastAfterExit();
  }, [clearMainTimer, removeToastAfterExit]);

  const startTimer = useCallback(
    (duration) => {
      if (!duration || duration <= 0) {
        hideToast();
        return;
      }

      clearMainTimer();
      startedAtRef.current = Date.now();
      remainingRef.current = duration;

      timeoutRef.current = window.setTimeout(() => {
        hideToast();
      }, duration);
    },
    [clearMainTimer, hideToast]
  );

  const showToast = useCallback(
    (options) => {
      const config = normalizeToast(options);

      clearAllTimers();
      setIsPaused(false);
      setToast(config);

      remainingRef.current = config.duration;
      startedAtRef.current = Date.now();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
          startTimer(config.duration);
        });
      });
    },
    [clearAllTimers, startTimer]
  );

  const pauseTimer = useCallback(() => {
    if (!toast || isPaused || !timeoutRef.current) return;

    const elapsed = Date.now() - startedAtRef.current;
    remainingRef.current = Math.max(remainingRef.current - elapsed, 0);

    clearMainTimer();
    setIsPaused(true);
  }, [clearMainTimer, isPaused, toast]);

  const resumeTimer = useCallback(() => {
    if (!toast || !isPaused) return;

    setIsPaused(false);
    startTimer(remainingRef.current || toast.duration);
  }, [isPaused, startTimer, toast]);

  const handleAction = useCallback(
    (actionTo) => {
      hideToast();

      if (actionTo) {
        window.setTimeout(() => {
          navigate(actionTo);
        }, 140);
      }
    },
    [hideToast, navigate]
  );

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && toast) {
        hideToast();
      }
    }

    function handleVisibilityChange() {
      if (!toast) return;

      if (document.hidden) {
        pauseTimer();
      } else {
        resumeTimer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearAllTimers();
    };
  }, [toast, hideToast, pauseTimer, resumeTimer, clearAllTimers]);

  const contextValue = useMemo(
    () => ({
      showToast,
      hideToast,
    }),
    [showToast, hideToast]
  );

  const theme = darkMode
    ? {
        wrapper:
          "border border-white/10 bg-zinc-950/95 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        progressTrack: "bg-white/10",
        progressBar: "bg-white/40",
        icon: "text-white/75",
        title: "text-white",
        description: "text-white/65",
        action:
          "border-b border-white/70 text-white hover:opacity-60 focus-visible:ring-white",
        close:
          "text-white/40 hover:text-white focus-visible:ring-white",
      }
    : {
        wrapper:
          "border border-black/10 bg-[#faf8f4] text-black shadow-[0_18px_50px_rgba(0,0,0,0.08)]",
        progressTrack: "bg-black/8",
        progressBar: "bg-black/35",
        icon: "text-black/70",
        title: "text-black",
        description: "text-black/62",
        action:
          "border-b border-black/70 text-black hover:opacity-55 focus-visible:ring-black",
        close:
          "text-black/40 hover:text-black focus-visible:ring-black",
      };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <Toast
        toast={toast}
        visible={visible}
        isPaused={isPaused}
        remaining={remainingRef.current}
        theme={theme}
        onClose={hideToast}
        onAction={handleAction}
        onPause={pauseTimer}
        onResume={resumeTimer}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }

  return context;
}