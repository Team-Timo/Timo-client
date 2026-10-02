import { Button } from "./Button";
import { TrashOnIcon } from "../../../icons";

import type { Meta, StoryObj } from "@storybook/react";

const VARIANTS = ["primary", "secondary"] as const;
const APPEARANCES = ["fill", "outline"] as const;
const SIZES = ["m", "lg"] as const;

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

export const Default: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-3">
          {[false, true].map((disabled) => (
            <div key={String(disabled)} className="flex items-center gap-3">
              {VARIANTS.map((variant) =>
                APPEARANCES.map((appearance) => (
                  <Button
                    key={`${variant}-${appearance}`}
                    variant={variant}
                    appearance={appearance}
                    size={size}
                    disabled={disabled}
                  >
                    {size === "m" ? "생성하기" : "시간 추가하기"}
                  </Button>
                )),
              )}
              {VARIANTS.map((variant) => (
                <Button
                  key={`${variant}-icon`}
                  variant={variant}
                  appearance="fill"
                  size={size}
                  disabled={disabled}
                  icon={<TrashOnIcon />}
                >
                  삭제하기
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <TrashOnIcon />,
    children: "삭제하기",
  },
};

export const FullWidth: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-100 flex-col gap-3">
      <Button variant="primary" appearance="fill" size="m" className="w-full">
        w-full
      </Button>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          appearance="outline"
          size="lg"
          className="flex-1"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          appearance="fill"
          size="lg"
          className="flex-1"
        >
          시간 추가하기
        </Button>
      </div>
    </div>
  ),
};
