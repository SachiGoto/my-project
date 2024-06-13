import React from 'react';
import { Button } from '@chakra-ui/react';
import { StoryFn, Meta } from '@storybook/react';
import {CustomButton} from '../app/Component';

export default {
    title: 'Custom Button',
    tags:['autodocs'],
    component: CustomButton,
    argTypes:{
      colorScheme:{
        control:{type:'radio'},
        options:['brand.primary', 'brand.secondary', 'brand.white']
      }
    }
  } as Meta;


  
  const Template: StoryFn = (args) => <Button {...args}>Button</Button>;

  
  export const Primary = Template.bind({});
  Primary.args = {
    colorScheme: 'black',
  
  };


  