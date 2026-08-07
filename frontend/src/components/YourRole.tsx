import { useEffect, useRef, useState } from "react";
import { contribCards, stats } from "../data/stats";
import { RING_COUNTER_ANIMATION_MS, RING_COUNTER_RADIUS } from "../constants";
import { easeOutCubic } from "../utils/easing";

function RingCounter({
  target,
  suffix,
  animate,
}: {
  target: number;
  suffix: string;
  animate: boolean;
}) {
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const circumference = 2 * Math.PI * RING_COUNTER_RADIUS;

  useEffect(() => {
    if (!animate) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / RING_COUNTER_ANIMATION_MS, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.round(eased * target));
      setOffset(circumference * (1 - eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, target, circumference]);

  return (
    <div className="relative mx-auto my-2 flex h-16 w-16 items-center justify-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 36 36"
        className="absolute left-0 top-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          className="fill-none stroke-border [stroke-width:3.5]"
          cx="18"
          cy="18"
          r={RING_COUNTER_RADIUS}
        />
        <circle
          className="fill-none stroke-accent [stroke-width:3.5] [stroke-linecap:round] motion-reduce:transition-none"
          cx="18"
          cy="18"
          r={RING_COUNTER_RADIUS}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: animate ? offset : circumference,
          }}
        />
      </svg>
      <span className="relative text-lg font-semibold text-primary">
        {count}
        {suffix}
      </span>
    </div>
  );
}

export default function YourRole() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-bg px-6 py-20">
      <div className="mx-auto max-w-[760px] text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-accent">
          Your role
        </p>
        <h2 className="mb-10 text-[clamp(22px,3vw,28px)] font-semibold text-primary">
          How will you be contributing?
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 text-left">
          {contribCards.map((card) => (
            <div
              className="rounded-card border border-border border-l-[3px] border-l-accent bg-card-bg p-6"
              key={card.title}
            >
              <card.icon
                className="mb-3 block text-accent"
                size={24}
                aria-hidden="true"
              />
              <h3 className="mb-3 text-[15px] font-semibold text-text">
                {card.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {card.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-2 text-[13px] leading-[1.55] text-text-muted"
                  >
                    <span
                      className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto my-14 h-px max-w-[760px] bg-border" />

      <div className="mx-auto max-w-[760px] text-center" ref={statsRef}>
        <h2 className="mb-10 text-[clamp(22px,3vw,28px)] font-semibold text-primary">
          Building it, bit by bit
        </h2>
        <p className="-mt-8 mb-8 text-[13px] text-text-muted">Our impact so far</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          {stats.map((s) => (
            <div
              className="relative overflow-hidden rounded-card border border-border bg-card-bg px-4 pb-6 pt-5 text-center"
              key={s.label}
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
              <s.icon
                className="mx-auto mb-2 block text-accent"
                size={22}
                aria-hidden="true"
              />
              <RingCounter target={s.target} suffix={s.suffix} animate={animate} />
              <p className="mt-2 text-xs leading-tight text-text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
