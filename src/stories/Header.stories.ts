// Header.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { Header, HeaderProps } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    heading: "Main Heading",   // ✅ match your actual prop names
    subheading: "Supporting text",
  } as HeaderProps,
};
