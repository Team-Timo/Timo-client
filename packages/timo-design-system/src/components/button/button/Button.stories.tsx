import { Button } from "./Button";
import { TrashDisableIcon, TrashOnIcon, TrashWhiteIcon } from "../../../icons";

import type { ButtonProps } from "./Button";
import type { Decorator, Meta, StoryObj } from "@storybook/react";

const VARIANTS = ["primary", "secondary"] as const;
const APPEARANCES = ["fill", "outline"] as const;
const SIZES = ["m", "lg"] as const;
const ICON_POSITIONS = ["left", "right"] as const;

const STORY_WIDTH: Record<ButtonProps["size"], string> = {
  m: "w-28",
  lg: "w-43",
};

const getTrashIcon = (variant: ButtonProps["variant"], isDisabled: boolean) => {
  if (variant === "primary") return <TrashWhiteIcon />;
  return isDisabled ? <TrashDisableIcon /> : <TrashOnIcon />;
};

const withStoryWidth: Decorator<ButtonProps> = (Story, { args }) => (
  <div className={STORY_WIDTH[args.size]}>
    <Story />
  </div>
);

const meta = {
  title: "Components/Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    appearance: { control: "select", options: APPEARANCES },
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean" },
    children: { control: "text" },
    icon: { control: false },
    iconPosition: { control: false },
  },
  args: {
    variant: "primary",
    appearance: "fill",
    size: "m",
    disabled: false,
    children: "생성하기",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withStoryWidth],
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-3">
          {[false, true].map((isDisabled) => (
            <div key={String(isDisabled)} className="flex items-center gap-3">
              {VARIANTS.map((variant) =>
                APPEARANCES.map((appearance) => (
                  <div
                    key={`${variant}-${appearance}`}
                    className={STORY_WIDTH[size]}
                  >
                    <Button
                      variant={variant}
                      appearance={appearance}
                      size={size}
                      disabled={isDisabled}
                    >
                      {size === "m" ? "생성하기" : "시간 추가하기"}
                    </Button>
                  </div>
                )),
              )}
              {ICON_POSITIONS.map((iconPosition) =>
                VARIANTS.map((variant) => (
                  <div
                    key={`${variant}-${iconPosition}`}
                    className={STORY_WIDTH[size]}
                  >
                    <Button
                      variant={variant}
                      appearance="fill"
                      size={size}
                      disabled={isDisabled}
                      icon={getTrashIcon(variant, isDisabled)}
                      iconPosition={iconPosition}
                    >
                      {iconPosition === "left" ? "삭제하기" : "이전"}
                    </Button>
                  </div>
                )),
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithLeftIcon: Story = {
  decorators: [withStoryWidth],
  args: {
    appearance: "fill",
    iconPosition: "left",
    children: "삭제하기",
  },
  argTypes: {
    appearance: { control: false },
  },
  render: (args) => (
    <Button
      {...args}
      icon={getTrashIcon(args.variant, Boolean(args.disabled))}
    />
  ),
};

export const WithRightIcon: Story = {
  decorators: [withStoryWidth],
  args: {
    appearance: "fill",
    iconPosition: "right",
    children: "이전",
  },
  argTypes: {
    appearance: { control: false },
  },
  render: (args) => (
    <Button
      {...args}
      icon={getTrashIcon(args.variant, Boolean(args.disabled))}
    />
  ),
};

export const Pressed: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-100 grid-cols-4 gap-1.25">
      <Button
        variant="secondary"
        appearance="fill"
        size="m"
        className="text-timo-black"
        aria-pressed
      >
        +10M
      </Button>
      <Button
        variant="secondary"
        appearance="fill"
        size="m"
        className="text-timo-black"
        aria-pressed={false}
      >
        +30M
      </Button>
      <Button
        variant="secondary"
        appearance="fill"
        size="m"
        className="text-timo-black"
        aria-pressed={false}
      >
        +1H
      </Button>
      <Button
        variant="secondary"
        appearance="fill"
        size="m"
        className="text-timo-black"
      >
        직접입력
      </Button>
    </div>
  ),
};

export const Layout: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-100 flex-col gap-3">
      <Button variant="primary" appearance="fill" size="m">
        부모 폭을 꽉 채움
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" appearance="outline" size="lg">
          닫기
        </Button>
        <Button variant="primary" appearance="fill" size="lg">
          시간 추가하기
        </Button>
      </div>
    </div>
  ),
};
