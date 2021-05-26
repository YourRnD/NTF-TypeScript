import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ThanksPage from '../components/common/ThanksPage/ThanksPage';

describe('SuccessMessage', () => {
  const onClick = jest.fn();

  const thankInfo = {
    score: 3,
    path: './assets/no_file.jpg',
  };

  it('Render component with all the props', async () => {
    render(<ThanksPage thankInfo={thankInfo} onClick={onClick} />);
    expect(
      screen.getByText(/We will respect your wishes/i)
    ).toBeInTheDocument();

    const image = screen.getByAltText(/Business's logo/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', './assets/no_file.jpg');

    const changeStars = screen.getAllByTestId('change-star');

    expect(changeStars.length).toBe(3);
    expect(changeStars[0]).toBeInTheDocument();
    expect(changeStars[1]).toBeInTheDocument();
    expect(changeStars[2]).toBeInTheDocument();

    const hideButton = screen.getByRole('button');

    fireEvent.click(hideButton);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
