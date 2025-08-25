import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/XXXXX/ButtonDesign"
    }
  }
};
export default meta;
type Story = StoryObj<typeof Button>;

import { ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children?: ReactNode; // ✅ include children
}

