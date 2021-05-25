import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/common/ErrorMessage/ErrorMessage';

describe('ErrorMessage', () => {
  const fullError = {
    status: 400,
    param: 'Test-param',
    message: 'Test-message',
  };

  const errorWithoutParam = {
    status: 400,
    param: '',
    message: 'Test-message',
  };

  const onClick = jest.fn();

  it('Render component with all the props', () => {
    render(<ErrorMessage error={fullError} onClick={onClick} />);
    expect(screen.getByText(/Error 400 in Test-param/i)).toBeInTheDocument();
    expect(screen.getByText(/Test-message/i)).toBeInTheDocument();
  });

  it('Render component without "error.param"', () => {
    render(<ErrorMessage error={errorWithoutParam} onClick={onClick} />);
    expect(screen.getByText(/Error 400!/i)).toBeInTheDocument();
    expect(screen.getByText(/Test-message/i)).toBeInTheDocument();
  });
});
