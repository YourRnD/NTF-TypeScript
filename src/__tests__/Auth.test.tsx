import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Auth from '../components/Auth/Auth';
import { signInSchema, signUpSchema } from '../common/validate';

describe('Auth', () => {
  const onSubmit = jest.fn();
  const invertTypeOperation = jest.fn();
  const closeForm = jest.fn();

  const initialValuesForRegist = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const initialValuesForLogin = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  it('Render component as registration page', () => {
    const { unmount } = render(
      <Auth
        typeOperation="Regist"
        onSubmit={onSubmit}
        validateSchema={signUpSchema}
        initialValue={initialValuesForRegist}
        invertTypeOperation={invertTypeOperation}
        closeForm={closeForm}
      />
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    unmount();
  });

  it('Render component as registration page and submit form', async () => {
    const { container, unmount } = render(
      <Auth
        typeOperation="Regist"
        onSubmit={onSubmit}
        validateSchema={signUpSchema}
        initialValue={initialValuesForRegist}
        invertTypeOperation={invertTypeOperation}
        closeForm={closeForm}
      />
    );

    const inputName: HTMLInputElement | null = container.querySelector(
      'input[name="name"]'
    );

    if (inputName === null) throw Error;

    fireEvent.change(inputName, { target: { value: 'Alex' } });
    expect(inputName.value).toBe('Alex');

    const inputEmail: HTMLInputElement | null = container.querySelector(
      'input[name="email"]'
    );

    if (inputEmail === null) throw Error;

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });
    expect(inputEmail.value).toBe('test@gmail.com');

    const inputPassword: HTMLInputElement | null = container.querySelector(
      'input[name="password"]'
    );

    if (inputPassword === null) throw Error;

    fireEvent.change(inputPassword, { target: { value: 'Qwerty_322' } });
    expect(inputPassword.value).toBe('Qwerty_322');

    const inputPasswordConfirm: HTMLInputElement | null = container.querySelector(
      'input[name="confirmPassword"]'
    );

    if (inputPasswordConfirm === null) throw Error;

    fireEvent.change(inputPasswordConfirm, { target: { value: 'Qwerty_322' } });
    expect(inputPasswordConfirm.value).toBe('Qwerty_322');

    const submit = container.querySelector('button.submit');

    expect(submit).toBeInTheDocument();
    expect(submit).not.toBeNull();

    if (submit === null) throw Error;

    fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    unmount();
  });

  it('Render component as login page', () => {
    const { unmount } = render(
      <Auth
        typeOperation="Login"
        onSubmit={onSubmit}
        validateSchema={signInSchema}
        initialValue={initialValuesForLogin}
        invertTypeOperation={invertTypeOperation}
        closeForm={closeForm}
      />
    );

    expect(screen.queryByPlaceholderText('Name')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Confirm Password')
    ).not.toBeInTheDocument();
    unmount();
  });

  it('Render component as login page and submit form', async () => {
    const { container, unmount } = render(
      <Auth
        typeOperation="Login"
        onSubmit={onSubmit}
        validateSchema={signInSchema}
        initialValue={initialValuesForLogin}
        invertTypeOperation={invertTypeOperation}
        closeForm={closeForm}
      />
    );

    const inputEmail: HTMLInputElement | null = container.querySelector(
      'input[name="email"]'
    );

    if (inputEmail === null) throw Error;

    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } });
    expect(inputEmail.value).toBe('test@gmail.com');

    const inputPassword: HTMLInputElement | null = container.querySelector(
      'input[name="password"]'
    );

    if (inputPassword === null) throw Error;

    fireEvent.change(inputPassword, { target: { value: 'Qwerty_322' } });
    expect(inputPassword.value).toBe('Qwerty_322');

    const submit = container.querySelector('button.submit');

    expect(submit).toBeInTheDocument();
    expect(submit).not.toBeNull();

    if (submit === null) throw Error;

    fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    unmount();
  });
});
