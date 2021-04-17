import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Auth from '../components/Auth/Auth';
import { signInSchema, signUpSchema } from '../common/validate';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const onSubmit = jest.fn();

test('Render signup', () => {
  const { unmount } = render(
    <Router history={createMemoryHistory()}>
      <Auth
        typeOperation="Regist"
        onSubmit={onSubmit}
        validateSchema={signUpSchema}
        initialValue={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      />
    </Router>
  );
  const inputName = screen.getByPlaceholderText('Name');
  expect(inputName).toBeInTheDocument();
  unmount();
});

test('Regist: submit success', async () => {
  const { container, unmount } = render(
    <Router history={createMemoryHistory()}>
      <Auth
        typeOperation="Regist"
        onSubmit={onSubmit}
        validateSchema={signUpSchema}
        initialValue={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      />
    </Router>
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

test('Render signin', () => {
  const { unmount } = render(
    <Router history={createMemoryHistory()}>
      <Auth
        typeOperation="Auth"
        onSubmit={onSubmit}
        validateSchema={signInSchema}
        initialValue={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      />
    </Router>
  );
  const inputName = screen.queryByPlaceholderText('Name');
  expect(inputName).not.toBeInTheDocument();
  unmount();
});

test('Auth: submit success', async () => {
  const { container, unmount } = render(
    <Router history={createMemoryHistory()}>
      <Auth
        typeOperation="Auth"
        onSubmit={onSubmit}
        validateSchema={signInSchema}
        initialValue={{
          email: '',
          password: '',
        }}
      />
    </Router>
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
