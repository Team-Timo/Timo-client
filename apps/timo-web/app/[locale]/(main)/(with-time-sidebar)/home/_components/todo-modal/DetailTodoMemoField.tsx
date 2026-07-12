export interface DetailTodoMemoFieldProps {
  value?: string | null;
  placeholder: string;
}

export const DetailTodoMemoField = ({
  value,
  placeholder,
}: DetailTodoMemoFieldProps) => {
  return (
    <textarea
      value={value ?? ""}
      placeholder={placeholder}
      readOnly
      className="typo-body-r-14 text-timo-black placeholder:text-timo-gray-700 min-h-20 w-full resize-none outline-none"
    />
  );
};
