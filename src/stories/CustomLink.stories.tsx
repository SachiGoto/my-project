import { StoryObj, Meta } from '@storybook/react';
import { CustomLink } from '../app/Component';

const meta: Meta<typeof CustomLink> = {
  component: CustomLink,
  title: "Custom Link",
  argTypes: {
    colorScheme: {
      control: { type: 'radio' },
      options: ['brand.primary', 'brand.secondary', 'brand.white.500']
    }
  }
};
export default meta;

type Story = StoryObj<typeof CustomLink>;

export const primary: Story = {
  args: {
    children: "ログイン",
    href: "/login",
    colorScheme: "brand.primary"
  },
  parameters: {
    nextjs: {
      router: {
        pathname: "/login"
      }
    },
  },
};
