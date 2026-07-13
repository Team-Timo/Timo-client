export interface PolicyDocumentProps {
  title: string;
  content: string;
}

export const PolicyDocument = ({ title, content }: PolicyDocumentProps) => {
  return (
    <div className="flex w-full max-w-[1147px] flex-col gap-7.5">
      <div className="flex flex-col gap-5">
        <h1 className="typo-headline-b-16 text-timo-gray-900 w-full">
          {title}
        </h1>
        <hr className="border-timo-gray-500 w-full" />
      </div>
      <p className="typo-body-m-12 text-timo-gray-900 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};
