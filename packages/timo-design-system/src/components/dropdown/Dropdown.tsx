import { cn } from "@lib";
import { useEffect, useRef, useState } from "react";

export interface DropdownProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown = ({
  items,
  value,
  onChange,
  placeholder = "기본",
  className,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
    onChange(item);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={cn("inline-flex flex-col", open && "shadow-timo", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-8 items-center gap-2.5 bg-white px-2",
          "border-timo-gray-500 border",
          open ? "rounded-t-[4px]" : "rounded-[4px]",
        )}
      >
        <span className="typo-headline-m-14 text-timo-gray-900 whitespace-nowrap">
          {value || placeholder}
        </span>
        <div className="flex size-6 shrink-0 items-center justify-center">
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            aria-hidden="true"
            className="text-timo-gray-900"
          >
            <path
              d={open ? "M1 7L8 1L15 7" : "M1 1L8 7L15 1"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {open && (
        <ul
          role="listbox"
          className="border-timo-gray-500 flex flex-col gap-1.5 rounded-b-[4px] border-x border-b bg-white px-2 py-1"
        >
          {items.map((item, i) => (
            <li key={item} className="flex flex-col gap-1">
              <span
                role="option"
                aria-selected={item === value}
                tabIndex={0}
                onClick={() => handleSelect(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(item);
                }}
                className="typo-body-m-12 text-timo-gray-900 cursor-pointer"
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <div className="bg-timo-gray-500 h-px w-full" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
