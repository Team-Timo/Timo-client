import { useLayoutEffect, useRef } from "react";

export interface DetailTodoMemoFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  maxLength: number;
  disabled?: boolean;
}

export const DetailTodoMemoField = ({
  value,
  placeholder,
  onChange,
  maxLength,
  disabled = false,
}: DetailTodoMemoFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      className="typo-headline-r-14 text-timo-gray-700 min-h-20 w-full resize-none overflow-hidden p-1 outline-none"
    />
  );
};
