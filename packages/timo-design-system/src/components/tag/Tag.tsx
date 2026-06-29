export interface TagProps {
  text: string;
}

export const Tag = ({ text = "과제" }: TagProps) => {
  return (
    <div className="bg-timo-gray-300 flex h-4 w-7.5 items-center justify-center rounded-[4px]">
      <span className="typo-caption-r-10 text-timo-gray-800 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};
