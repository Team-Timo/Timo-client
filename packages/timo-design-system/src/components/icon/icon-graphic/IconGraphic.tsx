import {
  TodoIconDailyIcon,
  TodoIconEtcIcon,
  TodoIconPlusIcon,
  TodoIconRelationshipIcon,
  TodoIconRestIcon,
  TodoIconStudyIcon,
  TodoIconTaskIcon,
  TodoIconWorkIcon,
} from "../../../icons";
import { cn } from "../../../lib";

import type { ComponentType, SVGProps } from "react";

export const TODO_ICON_VALUES = [
  "ICON_1",
  "ICON_2",
  "ICON_3",
  "ICON_4",
  "ICON_5",
  "ICON_6",
  "ICON_7",
  "ICON_8",
] as const;

export type TodoIconValue = (typeof TODO_ICON_VALUES)[number];

export const TODO_ICON_OPTIONS: readonly TodoIconValue[] = TODO_ICON_VALUES;

const ICON_GRAPHIC: Record<
  TodoIconValue,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  ICON_1: TodoIconDailyIcon,
  ICON_2: TodoIconPlusIcon,
  ICON_3: TodoIconEtcIcon,
  ICON_4: TodoIconRelationshipIcon,
  ICON_5: TodoIconRestIcon,
  ICON_6: TodoIconTaskIcon,
  ICON_7: TodoIconWorkIcon,
  ICON_8: TodoIconStudyIcon,
};

export const TODO_ICON_LABEL: Record<TodoIconValue, string> = {
  ICON_1: "일상",
  ICON_2: "기본",
  ICON_3: "기타",
  ICON_4: "관계",
  ICON_5: "휴식",
  ICON_6: "할일",
  ICON_7: "업무",
  ICON_8: "학습",
};

export interface IconGraphicProps {
  icon: TodoIconValue;
  className?: string;
}

export const IconGraphic = ({ icon, className }: IconGraphicProps) => {
  const Icon = ICON_GRAPHIC[icon];

  return <Icon className={cn("size-6", className)} />;
};
