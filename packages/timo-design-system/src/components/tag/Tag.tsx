export interface TagProps {
  text: string;
}

export const Tag = ({ text }: TagProps) => {
  return (
    <div className="bg-timo-gray-300 flex h-4 items-center justify-center rounded-[4px] px-[6.5px]">
      <span className="typo-caption-r-10 text-timo-gray-800 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};
