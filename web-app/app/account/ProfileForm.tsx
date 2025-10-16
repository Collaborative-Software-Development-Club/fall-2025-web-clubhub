"use client";

import { useState } from "react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    major: "",
    year: "",
    bio: "",
    isPublic: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
  
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // ✅ prints form data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      {/* form fields here (same as before) */}
      <div>
        <label className="block font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Major</label>
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Year</label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select year</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Graduate">Graduate</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
        />
        <label>Make profile public</label>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
