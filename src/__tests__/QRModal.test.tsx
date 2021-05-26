import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import QRModal from '../components/common/QRModal/QRModal';

describe('QRModal', () => {
  const hideModal = jest.fn();

  it('Render component', async () => {
    render(<QRModal hideModal={hideModal} path="./assets/no_file.jpg" />);

    const image = screen.getByAltText(/QR-code for redirect to feedback/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', './assets/no_file.jpg');

    const arrayButton = screen.getAllByRole('button');

    fireEvent.click(arrayButton[0]);

    await waitFor(() => {
      expect(hideModal).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(arrayButton[1]);

    await waitFor(() => {
      expect(hideModal).toHaveBeenCalledTimes(2);
    });
  });
});
