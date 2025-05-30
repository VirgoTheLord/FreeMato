import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Loader.css";

const Loader = ({ progress, onContinue, loading }) => {
  const numberRef = useRef(null);
  const buttonRef = useRef(null);
  const loaderRef = useRef(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let duration = 3000;
    let interval;

    interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let simulated = Math.min((elapsed / duration) * 100, 100);
      const finalProgress = Math.min(simulated, progress);
      setAnimatedProgress(finalProgress);

      if (simulated >= 100 && progress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    gsap.to(numberRef.current, {
      textContent: animatedProgress,
      duration: 0.3,
      snap: { textContent: 1 },
      ease: "power2.out",
      onUpdate: function () {
        if (numberRef.current) {
          numberRef.current.textContent = Math.floor(
            this.targets()[0].textContent
          );
        }
      },
    });

    if (animatedProgress >= 100 && progress >= 100 && !loading) {
      gsap.to(numberRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to(buttonRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  }, [animatedProgress, progress, loading]);

  const handleContinue = () => {
    gsap.to(loaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        // Optionally delay slightly to complete fade
        setTimeout(onContinue, 100); // You can tweak timing if needed
      },
    });
  };

  return (
    <div className="loader" ref={loaderRef}>
      <div className="number" ref={numberRef}>
        0
      </div>
      <button
        className="continue-btn"
        ref={buttonRef}
        onClick={handleContinue}
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        It’s time already, get in here <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default Loader;
