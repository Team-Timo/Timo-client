export interface PolicyDocumentProps {
  title: string;
  content: string;
  headingLevel?: "h1" | "h2";
}

export const PolicyDocument = ({
  title,
  content,
  headingLevel = "h1",
}: PolicyDocumentProps) => {
  const Heading = headingLevel;

  return (
    <div className="flex w-full max-w-[1147px] flex-col gap-7.5">
      <div className="flex flex-col gap-5">
        <Heading className="typo-headline-b-16 text-timo-gray-900 w-full">
          {title}
        </Heading>
        <hr className="border-timo-gray-500 w-full" />
      </div>
      <p className="typo-body-m-12 text-timo-gray-900 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};
