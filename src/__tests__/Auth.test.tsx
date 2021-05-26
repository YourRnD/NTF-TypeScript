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

    const name = screen.getByPlaceholderText('Name');

    fireEvent.change(name, { target: { value: 'Alex' } });
    expect(name).toHaveAttribute('value', 'Alex');

    const email = screen.getByPlaceholderText('Email');

    fireEvent.change(email, { target: { value: 'test@gmail.com' } });
    expect(email).toHaveAttribute('value', 'test@gmail.com');

    const password = screen.getByPlaceholderText('Password');

    fireEvent.change(password, { target: { value: 'Qwerty_322' } });
    expect(password).toHaveAttribute('value', 'Qwerty_322');

    const confirmPassword = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(confirmPassword, { target: { value: 'Qwerty_322' } });
    expect(confirmPassword).toHaveAttribute('value', 'Qwerty_322');

    const submit = screen.getByTestId('submit');

    expect(submit).toBeInTheDocument();
    expect(submit).not.toBeNull();

    fireEvent.click(submit);

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

    const email = screen.getByPlaceholderText('Email');

    fireEvent.change(email, { target: { value: 'test@gmail.com' } });
    expect(email).toHaveAttribute('value', 'test@gmail.com');

    const password = screen.getByPlaceholderText('Password');

    fireEvent.change(password, { target: { value: 'Qwerty_322' } });
    expect(password).toHaveAttribute('value', 'Qwerty_322');

    const submit = screen.getByTestId('submit');

    expect(submit).toBeInTheDocument();
    expect(submit).not.toBeNull();

    fireEvent.click(submit);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    unmount();
  });
});
