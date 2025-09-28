import { SigninData } from "../signin/page";
import { SignupData } from "../signup/page";

export const signupSteps = [
  {
    field: 'firstName' as keyof SignupData,
    placeholder: 'Enter your first name',
    type: 'text',
    title: 'What\'s your first name?',
    subtitle: 'Let\'s start with the basics'
  },
  {
    field: 'lastName' as keyof SignupData,
    placeholder: 'Enter your last name',
    type: 'text',
    title: 'And your last name?',
    subtitle: 'Almost there...'
  },
  {
    field: 'email' as keyof SignupData,
    placeholder: 'Enter your email address',
    type: 'email',
    title: 'Your email address',
    subtitle: 'We\'ll use this to keep you updated'
  },
  {
    field: 'password' as keyof SignupData,
    placeholder: 'Create a secure password',
    type: 'password',
    title: 'Create a password',
    subtitle: 'Make it strong and memorable'
  }
];

export const signinSteps = [
  {
    field: 'email' as keyof SigninData,
    placeholder: 'Enter your email address',
    type: 'email',
    title: 'Your email address',
    subtitle: 'Enter the email you used to create your account'
  },
  {
    field: 'password' as keyof SigninData,
    placeholder: 'Enter your password',
    type: 'password',
    title: 'Enter your password',
    subtitle: 'Enter your account password to continue'
  }
];