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
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={1}
      className="typo-body-r-12 text-timo-gray-800 w-full resize-none outline-none"
    />
  );
};
