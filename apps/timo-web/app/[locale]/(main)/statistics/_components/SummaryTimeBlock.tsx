import { formatStatisticsHourText } from "@/app/[locale]/(main)/statistics/_utils/format-statistics-time";

interface SummaryTimeBlockProps {
  label: string;
  minutes: number;
}

export const SummaryTimeBlock = ({ label, minutes }: SummaryTimeBlockProps) => (
  <div className="flex flex-col">
    <p className="typo-headline-r-14 text-timo-gray-700">{label}</p>
    <strong className="typo-headline-b-30">
      {formatStatisticsHourText(minutes)}
    </strong>
  </div>
);
