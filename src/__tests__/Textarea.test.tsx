import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Textarea from '../components/common/FormControls/Textarea/Textarea';

describe('Textarea', () => {
  const onChange = jest.fn();

  it('Render component without error message', async () => {
    const { unmount } = render(
      <Textarea
        placeholder="Test placeholder"
        name="Test name"
        onChange={onChange}
        error={null}
      />
    );

    const textarea = screen.getByPlaceholderText('Test placeholder');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'Test name');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'New test value' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    unmount();
  });

  it('Render component with error message', async () => {
    const { unmount } = render(
      <Textarea
        placeholder="Test placeholder"
        name="Test name"
        onChange={onChange}
        error="New error"
      />
    );

    const textarea = screen.getByPlaceholderText('Test placeholder');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'Test name');
    expect(screen.getByText(/New error/i)).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'New test value' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    unmount();
  });
});
