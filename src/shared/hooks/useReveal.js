import { useEffect, useRef, useState } from "react";

function canUseIntersectionObserver() {
  return (
    typeof window !== "undefined" &&
    typeof IntersectionObserver !== "undefined"
  );
}

function getInitialVisibleState({ disabled, initialVisible }) {
  if (disabled) return true;
  return Boolean(initialVisible);
}

function normalizeThreshold(threshold) {
  if (Array.isArray(threshold)) return threshold;
  return typeof threshold === "number" ? threshold : 0.12;
}

export default function useReveal({
  threshold = 0.12,
  root = null,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  disabled = false,
  initialVisible = false,
  onReveal,
} = {}) {
  const ref = useRef(null);
  const observerRef = useRef(null);
  const hasRevealedRef = useRef(false);
  const onRevealRef = useRef(onReveal);

  const [visible, setVisible] = useState(() =>
    getInitialVisibleState({ disabled, initialVisible })
  );

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      hasRevealedRef.current = true;
      return undefined;
    }

    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (!canUseIntersectionObserver()) {
      setVisible(true);
      hasRevealedRef.current = true;

      if (typeof onRevealRef.current === "function") {
        onRevealRef.current();
      }

      return undefined;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const normalizedThreshold = normalizeThreshold(threshold);

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const isVisibleEnough =
          isIntersecting && entry.intersectionRatio > 0;

        if (!isVisibleEnough) {
          if (!once && !hasRevealedRef.current) {
            setVisible(false);
          }

          if (!once && hasRevealedRef.current) {
            setVisible(false);
          }

          return;
        }

        setVisible(true);

        if (!hasRevealedRef.current) {
          hasRevealedRef.current = true;

          if (typeof onRevealRef.current === "function") {
            onRevealRef.current();
          }
        }

        if (once && observerRef.current) {
          observerRef.current.unobserve(element);
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      },
      {
        threshold: normalizedThreshold,
        root,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, root, rootMargin, once, disabled]);

  return { ref, visible, hasRevealed: hasRevealedRef.current };
}