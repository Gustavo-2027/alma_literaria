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

import useTheme from "../../theme/model/useTheme";
import Toast from "../ui/Toast";

const ToastContext = createContext(undefined);

const DEFAULT_TOAST = {
  title: "Concluído",
  description: "",
  actionLabel: "",
  actionTo: "",
  action: null,
  icon: "success",
  duration: 3600,
};

const ENTER_DELAY = 16;
const EXIT_DURATION = 700;
const NAVIGATION_DELAY = 140;
const FINISH_HOLD = 420;
const PROGRESS_FRAME_MS = 1000 / 60;

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
    duration: Math.max(Number(options?.duration ?? DEFAULT_TOAST.duration), 0),
  };
}

function getToastTheme(darkMode) {
  if (darkMode) {
    return {
      wrapper: "border border-zinc-700 bg-black text-white shadow-none",
      progressTrack: "bg-white/10",
      progressBar: "bg-white",
      icon: "text-white",
      title: "text-white",
      description: "text-zinc-300",
      action:
        "text-white hover:border-white hover:text-white focus-visible:ring-white/20",
      close: "text-zinc-400 hover:text-white focus-visible:ring-white/20",
    };
  }

  return {
    wrapper: "border-black bg-white text-black shadow-none",
    progressTrack: "bg-black/10",
    progressBar: "bg-black",
    icon: "text-black",
    title: "text-black",
    description: "text-zinc-700",
    action:
      "text-black hover:border-black hover:text-black focus-visible:ring-black/20",
    close: "text-zinc-500 hover:text-black focus-visible:ring-black/20",
  };
}

export function ToastProvider({ children }) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const mainTimerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const enterTimerRef = useRef(null);
  const finishHoldTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const startedAtRef = useRef(0);
  const remainingRef = useRef(0);
  const toastRef = useRef(null);
  const closingRef = useRef(false);

  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const clearMainTimer = useCallback(() => {
    if (mainTimerRef.current !== null) {
      window.clearTimeout(mainTimerRef.current);
      mainTimerRef.current = null;
    }
  }, []);

  const clearExitTimer = useCallback(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  const clearEnterTimer = useCallback(() => {
    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  }, []);

  const clearFinishHoldTimer = useCallback(() => {
    if (finishHoldTimerRef.current !== null) {
      window.clearTimeout(finishHoldTimerRef.current);
      finishHoldTimerRef.current = null;
    }
  }, []);

  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearMainTimer();
    clearExitTimer();
    clearEnterTimer();
    clearFinishHoldTimer();
    clearProgressInterval();
  }, [
    clearMainTimer,
    clearExitTimer,
    clearEnterTimer,
    clearFinishHoldTimer,
    clearProgressInterval,
  ]);

  const syncRemaining = useCallback(() => {
    if (!toastRef.current || closingRef.current || isPaused) return;

    const elapsed = Date.now() - startedAtRef.current;
    const nextRemaining = Math.max(remainingRef.current - elapsed, 0);

    setRemaining(nextRemaining);
  }, [isPaused]);

  const startProgressTracking = useCallback(() => {
    clearProgressInterval();
    syncRemaining();

    progressIntervalRef.current = window.setInterval(() => {
      syncRemaining();
    }, PROGRESS_FRAME_MS);
  }, [clearProgressInterval, syncRemaining]);

  const stopProgressTracking = useCallback(() => {
    clearProgressInterval();
  }, [clearProgressInterval]);

  const resetState = useCallback(() => {
    clearAllTimers();

    toastRef.current = null;
    closingRef.current = false;
    startedAtRef.current = 0;
    remainingRef.current = 0;

    setToast(null);
    setVisible(false);
    setIsPaused(false);
    setRemaining(0);
  }, [clearAllTimers]);

  const finishClose = useCallback(() => {
    clearExitTimer();

    exitTimerRef.current = window.setTimeout(() => {
      resetState();
    }, EXIT_DURATION);
  }, [clearExitTimer, resetState]);

  const hideToast = useCallback(() => {
    if (!toastRef.current || closingRef.current) return;

    closingRef.current = true;
    clearMainTimer();
    clearEnterTimer();
    clearFinishHoldTimer();
    stopProgressTracking();

    setIsPaused(false);
    setVisible(false);

    finishClose();
  }, [
    clearMainTimer,
    clearEnterTimer,
    clearFinishHoldTimer,
    stopProgressTracking,
    finishClose,
  ]);

  const scheduleFinishClose = useCallback(() => {
    clearFinishHoldTimer();

    finishHoldTimerRef.current = window.setTimeout(() => {
      hideToast();
    }, FINISH_HOLD);
  }, [clearFinishHoldTimer, hideToast]);

  const startTimer = useCallback(
    (duration) => {
      const nextDuration = Math.max(Number(duration || 0), 0);

      clearMainTimer();
      clearFinishHoldTimer();

      if (!toastRef.current || closingRef.current) return;

      if (nextDuration <= 0) {
        remainingRef.current = 0;
        setRemaining(0);
        scheduleFinishClose();
        return;
      }

      startedAtRef.current = Date.now();
      remainingRef.current = nextDuration;
      setRemaining(nextDuration);

      startProgressTracking();

      mainTimerRef.current = window.setTimeout(() => {
        remainingRef.current = 0;
        setRemaining(0);
        stopProgressTracking();
        scheduleFinishClose();
      }, nextDuration);
    },
    [
      clearMainTimer,
      clearFinishHoldTimer,
      startProgressTracking,
      stopProgressTracking,
      scheduleFinishClose,
    ]
  );

  const showToast = useCallback(
    (options) => {
      const nextToast = normalizeToast(options);

      clearAllTimers();
      closingRef.current = false;

      toastRef.current = nextToast;
      startedAtRef.current = 0;
      remainingRef.current = nextToast.duration;

      setToast(nextToast);
      setRemaining(nextToast.duration);
      setVisible(false);
      setIsPaused(false);

      enterTimerRef.current = window.setTimeout(() => {
        setVisible(true);
        startTimer(nextToast.duration);
      }, ENTER_DELAY);
    },
    [clearAllTimers, startTimer]
  );

  const replaceToast = useCallback(
    (options) => {
      const nextToast = normalizeToast(options);

      clearAllTimers();
      closingRef.current = false;

      toastRef.current = nextToast;
      startedAtRef.current = 0;
      remainingRef.current = nextToast.duration;

      setToast(nextToast);
      setRemaining(nextToast.duration);
      setVisible(true);
      setIsPaused(false);

      startTimer(nextToast.duration);
    },
    [clearAllTimers, startTimer]
  );

  const pauseTimer = useCallback(() => {
    if (!toastRef.current || closingRef.current || isPaused) return;

    if (mainTimerRef.current !== null) {
      const elapsed = Date.now() - startedAtRef.current;
      const nextRemaining = Math.max(remainingRef.current - elapsed, 0);

      remainingRef.current = nextRemaining;
      setRemaining(nextRemaining);
      clearMainTimer();
    }

    clearFinishHoldTimer();
    stopProgressTracking();
    setIsPaused(true);
  }, [
    clearFinishHoldTimer,
    clearMainTimer,
    stopProgressTracking,
    isPaused,
  ]);

  const resumeTimer = useCallback(() => {
    if (!toastRef.current || closingRef.current || !isPaused) return;

    setIsPaused(false);

    if (remainingRef.current <= 0) {
      scheduleFinishClose();
      return;
    }

    startTimer(remainingRef.current);
  }, [isPaused, scheduleFinishClose, startTimer]);

  const handleAction = useCallback(
    (actionTo) => {
      hideToast();

      if (actionTo) {
        window.setTimeout(() => {
          navigate(actionTo);
        }, NAVIGATION_DELAY);
      }
    },
    [hideToast, navigate]
  );

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && toastRef.current) {
        hideToast();
      }
    }

    function handleVisibilityChange() {
      if (!toastRef.current || closingRef.current) return;

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
  }, [hideToast, pauseTimer, resumeTimer, clearAllTimers]);

  const contextValue = useMemo(
    () => ({
      showToast,
      replaceToast,
      hideToast,
      isVisible: visible,
      currentToast: toast,
    }),
    [showToast, replaceToast, hideToast, visible, toast]
  );

  const theme = useMemo(() => getToastTheme(darkMode), [darkMode]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <Toast
        toast={toast}
        visible={visible}
        isPaused={isPaused}
        remaining={remaining}
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

  if (context === undefined) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }

  return context;
}