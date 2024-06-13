import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockRouter from 'next-router-mock';
import {CustomLink} from '../../Component';
import '@testing-library/jest-dom';


import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'; // Import from Next.js directly

describe("CustomLink Component", () => {
    it('navigates to the sign up page when the button is clicked', async () => {
      MockRouter.setCurrentUrl("/login");
      render(
        <RouterContext.Provider value={MockRouter}>
          <CustomLink href="/signup">新規登録</CustomLink>
        </RouterContext.Provider>
      );
  
      const link = screen.getByText('新規登録');
      await userEvent.click(link);
      expect(MockRouter.asPath).toBe('/signup');
    });
  });


