"use client";

import Image from "next/image";
import { useState } from "react";

export function ProfilePhoto({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1d3650] text-5xl font-bold text-white">
        {name[0]}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      className="object-cover object-top"
      onError={() => setError(true)}
    />
  );
}
