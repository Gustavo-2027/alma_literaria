import { useEffect, useMemo, useState } from "react";
import useReveal from "../hooks/useReveal";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}

function getDistanceValue(distance) {
  if (typeof distance === "number") {
    return `${distance}px`;
  }

  return distance || "24px";
}

function getRevealPreset(preset, distanceValue) {
  const presets = {
    up: {
      hidden: {
        opacity: 0,
        transform: `translate3d(0, ${distanceValue}, 0)`,
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
    "soft-up": {
      hidden: {
        opacity: 0,
        transform: `translate3d(0, calc(${distanceValue} * 0.6), 0)`,
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
    "soft-down": {
      hidden: {
        opacity: 0,
        transform: `translate3d(0, calc(${distanceValue} * -0.6), 0)`,
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
    "soft-left": {
      hidden: {
        opacity: 0,
        transform: `translate3d(calc(${distanceValue} * 0.6), 0, 0)`,
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
    "soft-right": {
      hidden: {
        opacity: 0,
        transform: `translate3d(calc(${distanceValue} * -0.6), 0, 0)`,
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
    fade: {
      hidden: {
        opacity: 0,
        transform: "translate3d(0, 0, 0)",
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
    none: {
      hidden: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
      visible: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      },
    },
  };

  return presets[preset] || presets.up;
}

function getMotionStyle({
  visible,
  shouldDisableAnimation,
  animation,
  delay,
  duration,
  blur,
  blurAmount,
  easing,
}) {
  if (shouldDisableAnimation) {
    return {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      filter: "blur(0px)",
    };
  }

  const state = visible ? animation.visible : animation.hidden;

  return {
    opacity: state.opacity,
    transform: state.transform,
    filter: blur ? (visible ? "blur(0px)" : `blur(${blurAmount}px)`) : "none",
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: easing,
    backfaceVisibility: "hidden",
    WebkitFontSmoothing: "antialiased",
  };
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
  duration = 900,
  disabled = false,
  blur = false,
  blurAmount = 6,
  distance = 24,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
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

  const distanceValue = useMemo(() => getDistanceValue(distance), [distance]);

  const animation = useMemo(
    () => getRevealPreset(preset, distanceValue),
    [preset, distanceValue]
  );

  const style = useMemo(
    () =>
      getMotionStyle({
        visible,
        shouldDisableAnimation,
        animation,
        delay,
        duration,
        blur,
        blurAmount,
        easing,
      }),
    [
      visible,
      shouldDisableAnimation,
      animation,
      delay,
      duration,
      blur,
      blurAmount,
      easing,
    ]
  );

  const classes = [
    "motion-reveal",
    !shouldDisableAnimation ? "will-change-[opacity,transform,filter]" : "",
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