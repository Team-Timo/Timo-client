const MEMO_MAX_LENGTH = 300;

const resizeTextarea = (element: HTMLTextAreaElement | null) => {
  if (!element) return;
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

export interface CreateTodoMemoFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const CreateTodoMemoField = ({
  value,
  placeholder,
  onChange,
}: CreateTodoMemoFieldProps) => {
  return (
    <textarea
      value={value}
      ref={resizeTextarea}
      onChange={(event) => onChange(event.target.value)}
      onInput={(event) => resizeTextarea(event.currentTarget)}
      placeholder={placeholder}
      maxLength={MEMO_MAX_LENGTH}
      rows={1}
      className="typo-body-r-12 text-timo-gray-800 max-h-[40vh] w-full resize-none overflow-y-auto wrap-break-word outline-none"
    />
  );
};
