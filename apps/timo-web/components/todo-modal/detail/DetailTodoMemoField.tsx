import { useLayoutEffect, useRef } from "react";

export interface DetailTodoMemoFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  maxLength: number;
}

export const DetailTodoMemoField = ({
  value,
  placeholder,
  onChange,
  maxLength,
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
      className="typo-body-r-14 text-timo-black placeholder:text-timo-gray-700 min-h-20 w-full resize-none overflow-hidden p-1 outline-none"
    />
  );
};
