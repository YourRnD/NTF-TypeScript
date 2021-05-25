import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Input from '../components/common/FormControls/Input/Input';

describe('Input', () => {
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const onChange = jest.fn();

  it('Render component without error message', async () => {
    const { unmount } = render(
      <Input
        placeholder="Test placeholder"
        type="email"
        name="Test name"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        error={null}
        value="Test value"
      />
    );

    const input = screen.getByPlaceholderText('Test placeholder');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'Test name');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('value', 'Test value');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'New test value' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    unmount();
  });

  it('Render component with error message', async () => {
    const { unmount } = render(
      <Input
        placeholder="Test placeholder"
        type="email"
        name="Test name"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        error="New error"
        value="Test value"
      />
    );

    const input = screen.getByPlaceholderText('Test placeholder');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'Test name');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('value', 'Test value');
    expect(screen.getByText(/New error/i)).toBeInTheDocument();

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'New test value' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onBlur).toHaveBeenCalledTimes(2);
    });

    unmount();
  });
});
