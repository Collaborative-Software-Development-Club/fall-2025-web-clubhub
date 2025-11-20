"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react"; //imports the pencil edit icon

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
  const [hovered, setHovered] = useState<boolean>(false);

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
    <div
      className="relative inline-block cursor-pointer group"
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)} 
      onClick={() => document.getElementById("profileUpload")?.click()}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition duration-300 rounded-full ${
          hovered ? "grayscale" : "" 
        }`}
      />

      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
          <Pencil className="text-white w-8 h-8" />
        </div>
      )}

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