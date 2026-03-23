import { useEffect, useMemo, useState } from "react";
import useReveal from "../hooks/useReveal";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}

const REVEAL_PRESETS = {
  up: {
    hidden: "translate-y-8 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  "soft-up": {
    hidden: "translate-y-5 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  "soft-down": {
    hidden: "-translate-y-5 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  "soft-left": {
    hidden: "translate-x-5 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  "soft-right": {
    hidden: "-translate-x-5 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  none: {
    hidden: "opacity-100",
    visible: "opacity-100",
  },
};

function getRevealPreset(preset) {
  return REVEAL_PRESETS[preset] || REVEAL_PRESETS.up;
}

function getRevealStateClass({
  visible,
  shouldDisableAnimation,
  animation,
}) {
  if (shouldDisableAnimation) {
    return "translate-x-0 translate-y-0 opacity-100";
  }

  return visible ? animation.visible : animation.hidden;
}

function getBlurClass({ blur, visible, shouldDisableAnimation }) {
  if (!blur || shouldDisableAnimation) return "";
  return visible ? "blur-0" : "blur-[4px]";
}

export default function Reveal({
  children,
  as: Component = "section",
  className = "",
  preset = "up",
  threshold = 0.12,
  root = null,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  delay = 0,
  duration = 800,
  disabled = false,
  blur = false,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldDisableAnimation = disabled || prefersReducedMotion;

  const { ref, visible } = useReveal({
    threshold,
    root,
    rootMargin,
    once,
    disabled: shouldDisableAnimation,
  });

  const animation = useMemo(() => getRevealPreset(preset), [preset]);

  const stateClass = getRevealStateClass({
    visible,
    shouldDisableAnimation,
    animation,
  });

  const blurClass = getBlurClass({
    blur,
    visible,
    shouldDisableAnimation,
  });

  const style = useMemo(() => {
    if (shouldDisableAnimation) return undefined;

    return {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
    };
  }, [delay, duration, shouldDisableAnimation]);

  const classes = [
    "transform-gpu transition-all ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform,filter]",
    stateClass,
    blurClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component ref={ref} style={style} className={classes}>
      {children}
    </Component>
  );
}