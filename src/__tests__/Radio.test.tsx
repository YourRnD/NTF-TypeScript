import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Radio from '../components/common/FormControls/Radio/Radio';

describe('Radio', () => {
  const onChange = jest.fn();

  const valuesArray = [
    {
      id: 'id-1',
      value: 'Test value №1',
    },
    {
      id: 'id-2',
      value: 'Test value №2',
    },
    {
      id: 'id-3',
      value: 'Test value №3',
    },
  ];

  it('Render component without error message', async () => {
    const { unmount } = render(
      <Radio
        placeholder="Test placeholder"
        name="Test name"
        onChange={onChange}
        error={null}
        valuesArray={valuesArray}
      />
    );

    const firstElem = await screen.findByDisplayValue('Test value №1');

    expect(firstElem).toBeInTheDocument();
    expect(firstElem).toHaveAttribute('type', 'radio');
    expect(firstElem).toHaveAttribute('name', 'Test name');
    expect(firstElem).toHaveAttribute('id', 'id-1');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();

    fireEvent.click(firstElem);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    const secondElem = await screen.findByDisplayValue('Test value №2');

    expect(secondElem).toBeInTheDocument();
    expect(secondElem).toHaveAttribute('type', 'radio');
    expect(secondElem).toHaveAttribute('name', 'Test name');
    expect(secondElem).toHaveAttribute('id', 'id-2');

    fireEvent.click(secondElem);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    const thirdElem = await screen.findByDisplayValue('Test value №3');

    expect(thirdElem).toBeInTheDocument();
    expect(thirdElem).toHaveAttribute('type', 'radio');
    expect(thirdElem).toHaveAttribute('name', 'Test name');
    expect(thirdElem).toHaveAttribute('id', 'id-3');

    fireEvent.click(thirdElem);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    unmount();
  });

  it('Render component without valuesArray', async () => {
    const { unmount } = render(
      <Radio
        placeholder="Test placeholder"
        name="Test name"
        onChange={onChange}
        error={null}
        valuesArray={undefined}
      />
    );

    expect(screen.queryByTestId('elem')).not.toBeInTheDocument();

    unmount();
  });

  it('Render component with error message', async () => {
    const { unmount } = render(
      <Radio
        placeholder="Test placeholder"
        name="Test name"
        onChange={onChange}
        error="New error"
        valuesArray={[valuesArray[0]]}
      />
    );

    const firstElem = await screen.findByDisplayValue('Test value №1');

    expect(firstElem).toBeInTheDocument();
    expect(firstElem).toHaveAttribute('type', 'radio');
    expect(firstElem).toHaveAttribute('name', 'Test name');
    expect(firstElem).toHaveAttribute('id', 'id-1');
    expect(screen.getByText(/New error/i)).toBeInTheDocument();

    fireEvent.click(firstElem);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(4);
    });

    unmount();
  });
});
