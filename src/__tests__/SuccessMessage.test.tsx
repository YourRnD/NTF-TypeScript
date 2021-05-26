import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SuccessMessage from '../components/common/SuccessMessage/SuccessMessage';

describe('SuccessMessage', () => {
  const onClick = jest.fn();

  it('Render component with all the props', async () => {
    render(<SuccessMessage successMessage="Test message" onClick={onClick} />);
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
    expect(screen.getByText(/Test message/i)).toBeInTheDocument();

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
});
