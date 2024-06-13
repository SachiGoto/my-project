import React from 'react';
// import { Button } from '@chakra-ui/react';
import { StoryFn, Meta } from '@storybook/react';
import {CustomLoadingButton} from '../app/Component/CustomLoadingButton';

export default {
    title: 'Custom Loading Button',
    component: CustomLoadingButton,
    argTypes: { onClick: { action: 'clicked' },
    colorScheme:{
      control:{type:'radio'},
      options:['brand.primary', 'brand.secondary', 'brand.white.500']
    }
   },
  } as Meta;
  
  const Template: StoryFn<typeof CustomLoadingButton> = (args) => <CustomLoadingButton {...args} />;
  const Template2: StoryFn<typeof CustomLoadingButton> = (args) => <div>
    <CustomLoadingButton {...args}/> <CustomLoadingButton {...args} />
    </div>

export const Primary = Template.bind({});
Primary.args = {
  text: "お気に入りリスト", 
  colorScheme: 'brand.secondary',
  isLoading: false,
  loadingText: "処理中",
  variant: "solid",
  type: "button",
};


  