"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface EditableProfilePictureProps {
  initialSrc: string;
  alt: string;
  width: number;
  height: number;
}

export default function EditableProfilePicture({
  initialSrc,
  alt,
  width,
  height,
}: EditableProfilePictureProps) {
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block cursor-pointer">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="transition duration-300 hover:grayscale"
        onClick={() => document.getElementById("profileUpload")?.click()}
      />
      <input
        type="file"
        id="profileUpload"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}
