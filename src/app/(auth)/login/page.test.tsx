// Page.test.tsx
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent, waitFor,cleanup  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import Login from './page';
import { server } from "../../../mocks/server";
import { rest } from "msw"
import Router from 'next/router';

// mock next nevigation 
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn()
}));

// jest.mock('next/router', () => require('next-router-mock'));

// global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
//   // Define what the mocked fetch should return
//   const response = new Response(JSON.stringify({ token: 'fake-token', expiresIn: 3600 }), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
//   return Promise.resolve(response);
// }) as jest.Mock;

// const handleSubmit = jest.fn();

// jest.mock('next/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/login'); // Set the initial URL
});


function getEmail(){
  return screen.getByLabelText(/メールアドレス/i);
}

function getPassword(){
  return screen.getByLabelText(/パスワード/i);
}

describe("Login Page Tests", () => {
  describe("render", ()=>{
    it('has email input and password input', async () => {
      render(<Login />);
      const emailInput = getEmail();
      const passwordInput = getPassword();
      const submitButton = screen.getByRole('button', { name: /ログイン/i });
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
 
    });
  })
  describe("behaviour", ()=>{
    it('should show an error message when a user enter an invalid email address', async () => {
      render(<Login />);
      const emailInput = getEmail();
      await userEvent.type(emailInput, 'test');
      expect(emailInput).toHaveValue("test")
      const errorMessage = screen.getByText("Invalid email address");
      expect(errorMessage).toBeInTheDocument();
  })
  it('should show an error message when a user enter an invalid password', async () => {
    render(<Login />);
    const passwordInput = getPassword();
    await userEvent.type(passwordInput, '123');
    const errorMessage = screen.getByText('Password must be at least 10 characters');
    expect(passwordInput).toHaveValue("123")
    expect(errorMessage).toBeInTheDocument;
  })

  it('should show two errors messages when a user hit the login button without filling out the input fields', async () => {
    render(<Login />);
    const emailInput = getEmail();
    const passwordInput = getPassword();

    const submitButton = screen.getByRole('button', { name: /ログイン/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);
    const emailErrorMessage = screen.getByText('Password must be at least 10 characters');
    const passwordErrorMessage = screen.getByText("Invalid email address");
    expect(emailErrorMessage).toBeInTheDocument;
    expect(passwordErrorMessage).toBeInTheDocument;
  })





  // havent figured out how to test these two 
  it('should direct to the main page if log in was successful', async () => {
    render(<Login />);
    // const router = useRouter(); 
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const submitButton = screen.getByRole('button', { name: /ログイン/i });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'Test12345!');
    await userEvent.click(submitButton);    
    const loginState = await screen.findByTestId('loginState'); 
    expect(loginState).toHaveTextContent('Loggedin');
    // expect(router.push).toHaveBeenCalledWith('/');
    expect(Router.push).toHaveBeenCalledWith('/');

})

  it('should show a log in failed message when a user failed to log in ', async()=>{
    render(<Login />);
       server.use(
      rest.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.status(403));
      })
    );
  
    const submitButton = screen.getByRole('button', { name: /ログイン/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);
    const loginState = await screen.findByTestId('loginState'); 
    expect(loginState).toHaveTextContent('Not Loggedin');
  })
});

});











