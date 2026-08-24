"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export function QRCodeCanvas({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 160,
        margin: 1,
        color: { dark: "#07111d", light: "#ffffff" },
      });
    }
  }, [url]);

  return <canvas ref={canvasRef} className="rounded-xl" />;
}
