import { AlertCircle, Check, ShoppingBag, X } from "lucide-react";

function getToastIcon(icon) {
  switch (icon) {
    case "cart":
      return <ShoppingBag className="h-[15px] w-[15px]" strokeWidth={1.75} />;
    case "error":
      return <AlertCircle className="h-[15px] w-[15px]" strokeWidth={1.75} />;
    case "success":
    default:
      return <Check className="h-[15px] w-[15px]" strokeWidth={1.75} />;
  }
}

function Toast({
  toast,
  visible,
  isPaused,
  remaining,
  theme,
  onClose,
  onAction,
  onPause,
  onResume,
}) {
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[9999] flex justify-center px-4 sm:bottom-6">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        className={`pointer-events-auto relative w-full max-w-[560px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        } ${theme.wrapper}`}
      >
        <div className={`absolute inset-x-0 top-0 h-px ${theme.progressTrack}`}>
          <div
            key={`${toast.title}-${toast.description}-${toast.duration}-${isPaused}`}
            className={`h-full ${theme.progressBar} ${
              isPaused ? "" : "animate-[toast-progress_linear_forwards]"
            }`}
            style={{
              animationDuration: `${remaining || toast.duration}ms`,
              animationPlayState: isPaused ? "paused" : "running",
              transformOrigin: "left center",
            }}
          />
        </div>

        <div className="flex items-start gap-4 px-5 py-4 sm:px-6 sm:py-5">
          <div className={`mt-[2px] shrink-0 ${theme.icon}`}>
            {getToastIcon(toast.icon)}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={`text-[11px] font-medium uppercase tracking-[0.26em] ${theme.title}`}
            >
              {toast.title}
            </p>

            {toast.description ? (
              <p
                className={`mt-2 max-w-[46ch] text-[14px] leading-6 ${theme.description}`}
              >
                {toast.description}
              </p>
            ) : null}

            {toast.actionLabel && toast.actionTo ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onAction(toast.actionTo)}
                  className={`inline-flex items-center pb-[2px] text-[10px] font-medium uppercase tracking-[0.24em] transition duration-300 focus:outline-none focus-visible:ring-1 ${theme.action}`}
                >
                  {toast.actionLabel}
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 transition duration-300 focus:outline-none focus-visible:ring-1 ${theme.close}`}
            aria-label="Fechar notificação"
          >
            <X className="h-[15px] w-[15px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;