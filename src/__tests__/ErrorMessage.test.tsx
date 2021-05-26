import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('Render component with all the props', async () => {
    render(<ErrorMessage error={fullError} onClick={onClick} />);
    expect(screen.getByText(/Error 400 in Test-param/i)).toBeInTheDocument();
    expect(screen.getByText(/Test-message/i)).toBeInTheDocument();

    const arrayButton = screen.getAllByRole('button');

    fireEvent.click(arrayButton[0]);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(arrayButton[1]);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  it('Render component without "error.param"', async () => {
    render(<ErrorMessage error={errorWithoutParam} onClick={onClick} />);
    expect(screen.getByText(/Error 400!/i)).toBeInTheDocument();
    expect(screen.getByText(/Test-message/i)).toBeInTheDocument();

    const arrayButton = screen.getAllByRole('button');

    fireEvent.click(arrayButton[0]);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(3);
    });

    fireEvent.click(arrayButton[1]);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(4);
    });
  });
});
