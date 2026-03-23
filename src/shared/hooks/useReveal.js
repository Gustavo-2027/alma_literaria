import { useEffect, useRef, useState } from "react";

function getInitialVisibility(disabled) {
  return Boolean(disabled);
}

export default function useReveal({
  threshold = 0.12,
  root = null,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  disabled = false,
} = {}) {
  const ref = useRef(null);
  const observerRef = useRef(null);
  const [visible, setVisible] = useState(() =>
    getInitialVisibility(disabled)
  );

  useEffect(() => {
    const element = ref.current;

    if (disabled) {
      observerRef.current?.disconnect();
      observerRef.current = null;
      setVisible(true);
      return undefined;
    }

    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observerRef.current = observer;
    observer.observe(element);

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [threshold, root, rootMargin, once, disabled]);

  return { ref, visible };
}