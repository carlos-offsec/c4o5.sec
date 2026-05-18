import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    const characters = "0123456789ABCDEF";
    let columns: number;
    let drops: number[] = [];

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      columns = Math.floor(canvas!.width / fontSize);
      for (let x = 0; x < columns; x++) {
        if (drops[x] === undefined) {
          drops[x] = Math.floor(Math.random() * (canvas!.height / fontSize)) * -1;
        }
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = fontSize + "px monospace";

      for (let i = 0; i < columns; i++) {
        if (drops[i] >= 0) {
          const text = characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
          ctx!.fillStyle = i % 2 === 0 ? "#00f2ff" : "#bc13fe";
          ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
        }
        drops[i]++;
        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    }

    const interval = setInterval(draw, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="digitalRain"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.85) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
