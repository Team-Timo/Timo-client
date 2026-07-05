import { TrashOnIcon } from "@icons";
import { cn } from "@lib";

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "typo-headline-r-14 text-timo-black flex h-8.25 w-20 items-center gap-0.5 rounded-[4px] bg-white p-1.5",
        "active:bg-timo-blue-300 active:text-white active:[&_path]:fill-white",
      )}
    >
      <TrashOnIcon className="size-4.5 shrink-0" />
      삭제하기
    </button>
  );
};
