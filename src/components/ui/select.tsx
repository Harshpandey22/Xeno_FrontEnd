import React, { useState } from "react";

interface SelectProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ options, onSelect, placeholder }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        className="w-full px-4 py-2 text-left bg-gray-100 rounded border focus:outline-none"
        onClick={() => setSelected((prev) => (prev === null ? "" : null))}
      >
        {selected || placeholder || "Select an option"}
      </button>
      {selected !== null && (
        <ul className="absolute w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto mt-1">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelected(option);
                onSelect(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2">{children}</div>
);

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-2 bg-white border rounded shadow-lg">{children}</div>
);

export const SelectItem: React.FC<{ value: string; onClick: () => void }> = ({
  value,
  onClick,
}) => (
  <div
    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    onClick={onClick}
  >
    {value}
  </div>
);
