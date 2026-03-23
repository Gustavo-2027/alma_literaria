import { AlertCircle, Check, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TOAST_ICONS = {
  cart: ShoppingBag,
  error: AlertCircle,
  success: Check,
};

function ToastIcon({ icon = "success", className = "h-[14px] w-[14px]" }) {
  const Icon = TOAST_ICONS[icon] ?? TOAST_ICONS.success;
  return <Icon className={className} strokeWidth={1.7} aria-hidden="true" />;
}

export default function Toast({
  toast,
  visible = false,
  isPaused = false,
  remaining = 0,
  theme,
  onClose,
  onAction,
  onPause,
  onResume,
}) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartXRef = useRef(null);
  const toastRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      setDragX(0);
      setIsDragging(false);
      pointerStartXRef.current = null;
    }
  }, [visible]);

  if (!toast || !theme) return null;

  const {
    title = "",
    description = "",
    duration = 4000,
    icon = "success",
    actionLabel = "",
    actionTo,
    action,
  } = toast;

  const isError = icon === "error";
  const hasTitle = Boolean(title);
  const hasDescription = Boolean(description);
  const hasAction = Boolean(
    actionLabel && (actionTo || typeof action === "function")
  );

  const safeDuration = Math.max(duration, 1);
  const progressPercentage = Math.max(
    0,
    Math.min(100, (remaining / safeDuration) * 100)
  );

  const isFinishing = progressPercentage <= 10;
  const isCompact = !hasDescription && !hasAction;

  function handleClose() {
    onClose?.();
  }

  function handleActionClick() {
    if (typeof action === "function") {
      action();
      return;
    }

    if (actionTo) {
      onAction?.(actionTo);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      handleClose();
    }
  }

  function handlePointerDown(event) {
    pointerStartXRef.current = event.clientX;
    setIsDragging(true);
    onPause?.();
  }

  function handlePointerMove(event) {
    if (!isDragging || pointerStartXRef.current === null) return;
    const deltaX = event.clientX - pointerStartXRef.current;
    setDragX(deltaX);
  }

  function handlePointerUp() {
    if (!isDragging) return;

    const shouldDismiss = Math.abs(dragX) > 96;

    setIsDragging(false);
    pointerStartXRef.current = null;

    if (shouldDismiss) {
      handleClose();
      return;
    }

    setDragX(0);
    onResume?.();
  }

  const dragOpacity = Math.max(0.72, 1 - Math.abs(dragX) / 240);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] flex justify-center px-3 pb-3 sm:px-6 sm:pb-6">
      <div
        ref={toastRef}
        role={isError ? "alert" : "status"}
        aria-live={isError ? "assertive" : "polite"}
        aria-atomic="true"
        tabIndex={-1}
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={[
          "pointer-events-auto relative w-full max-w-[560px] overflow-hidden border",
          "transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "transform-gpu will-change-[transform,opacity]",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          theme.wrapper,
        ].join(" ")}
        style={{
          transform: visible
            ? `translate3d(${dragX}px, 0, 0)`
            : `translate3d(${dragX}px, 24px, 0)`,
          opacity: visible ? dragOpacity : 0,
          transitionDuration: isDragging ? "0ms" : "700ms",
        }}
      >
        <div
          className={`absolute inset-x-0 top-0 h-[1.5px] overflow-hidden ${theme.progressTrack}`}
          aria-hidden="true"
        >
          <div
            className={`relative h-full ${theme.progressBar}`}
            style={{
              width: `${progressPercentage}%`,
              opacity: isFinishing ? Math.max(progressPercentage / 10, 0.18) : 1,
              transition: isPaused || isDragging
                ? "none"
                : "width 80ms linear, opacity 220ms ease-out",
              willChange: "width, opacity",
            }}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-transparent via-current/25 to-transparent opacity-60" />
          </div>
        </div>

        <div
          className={`flex items-start gap-4 px-4 py-4 sm:px-6 ${
            isCompact ? "sm:py-4" : "sm:py-5"
          }`}
        >
          <div className={`mt-[3px] shrink-0 ${theme.icon}`}>
            <ToastIcon icon={icon} />
          </div>

          <div className="min-w-0 flex-1">
            {hasTitle ? (
              <p
                className={`text-[10px] font-medium uppercase tracking-[0.32em] ${theme.title}`}
              >
                {title}
              </p>
            ) : null}

            {hasDescription ? (
              <p
                className={`max-w-[48ch] text-[13px] leading-[1.7] ${
                  hasTitle ? "mt-2.5" : ""
                } ${theme.description}`}
              >
                {description}
              </p>
            ) : null}

            {hasAction ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleActionClick}
                  className={[
                    "group inline-flex min-h-[32px] items-center gap-2 border-b border-transparent pb-[2px]",
                    "text-[10px] font-medium uppercase tracking-[0.28em]",
                    "transition-all duration-300 focus:outline-none focus-visible:ring-1",
                    theme.action,
                  ].join(" ")}
                >
                  <span>{actionLabel}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
                    →
                  </span>
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleClose}
            className={[
              "shrink-0 rounded-full p-1 transition-all duration-300",
              "focus:outline-none focus-visible:ring-1",
              theme.close,
            ].join(" ")}
            aria-label={
              hasTitle ? `Fechar notificação: ${title}` : "Fechar notificação"
            }
          >
            <X
              className="h-[14px] w-[14px]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}