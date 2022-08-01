import AuthForm from "./AuthForm";
import { render,screen } from "@testing-library/react";
// import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'

describe('AuthForm Testing', ()=>{
    test('Sign Up Exists', ()=>{
        render(<AuthForm/>)

        const signUpElement = screen.getByText('Sign Up')
        expect(signUpElement).toBeInTheDocument
    })
    test('Email Exists',()=>{
        render(<AuthForm/>)
        const emailElement = screen.getByText('Your Email')
        expect(emailElement).toBeInTheDocument
    })
    test('Password Exists',()=>{
        render(<AuthForm/>)
        const passElement = screen.getByText('Your Password')
        expect(passElement).toBeInTheDocument

    })
    test('Create Account Exits',()=>{
        render(<AuthForm/>)

        const loginElement = screen.getByText('Create Account')
        expect(loginElement).toBeInTheDocument
    })
    test('Login Link Exists', ()=>{
        render(<AuthForm/>)
        
        const linkElement = screen.getByText('Login with existing account')
        expect(linkElement).toBeInTheDocument
    })

    test('Redirect to Login Page', ()=>{
        render(<AuthForm/>)

        const linkElement = screen.getByText('Login with existing account')
        userEvent.click(linkElement)

        const loginText = screen.getByText('Your Email') 
        expect(loginText).toBeInTheDocument
    })

    test('Create New Account Exists', ()=>{
        render(<AuthForm/>)

        const linkElement = screen.getByText('Login with existing account')
        userEvent.click(linkElement)

        const loginText = screen.getByText('Create new account') 
        expect(loginText).toBeInTheDocument
    })
})