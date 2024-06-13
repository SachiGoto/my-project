import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { QuoteModal } from '../app/Component';
// import { StoryFn, Meta } from '@storybook/react';
import { StoryObj, Meta } from '@storybook/react';


const meta:Meta<typeof QuoteModal>={
    component:QuoteModal,
    title:"QuoteModal"
  }
  export default meta;


  type Story = StoryObj<typeof QuoteModal>;

  export const quoteModal:Story={
    render:()=> <QuoteModal /> 
  }

// export default{
//     title: 'QuoteModal',
//     component: QuoteModal,
//     argTypes: {},
// } as Meta;


// const Template: StoryFn<typeof QuoteModal> = () => <QuoteModal />;

// export const Primary = Template.bind({});

// Primary.args={
//     quote : "test",
//     author:"test author",
//     quoteId:1,
//     type:"button"

// }

// type Quote = [
//     {
//       quote: string;
//       author: string;
//       category: string;
//       quoteId:string;
//       type?:string;
//     }
//   ];