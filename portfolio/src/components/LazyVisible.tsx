import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface LazyVisibleProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Defers mounting `children` until this element scrolls near the viewport.
 * Combined with React.lazy(), this ensures the wrapped chunk's JS isn't even
 * requested until the user is about to see it (e.g. below-the-fold 3D content).
 */
export default function LazyVisible({
  children,
  fallback = null,
  rootMargin = "200px",
  style,
  className,
}: LazyVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} style={style} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
