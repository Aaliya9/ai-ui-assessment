import "../src/app/globals.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: { expanded: true },
    backgrounds: { default: "light" },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/XXXXX/YourDesignSystem" // replace with your figma link
    }
  },
};

export default preview;
