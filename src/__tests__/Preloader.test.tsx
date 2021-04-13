import React from 'react';
import { render, screen } from '@testing-library/react';
import Preloader from '../components/common/Preloader';

test('Render preloader', () => {
  render(<Preloader isLoader={true} />);
  const preloaderElem = screen.getByAltText(/Preloader/i);
  expect(preloaderElem).toBeInTheDocument();
});

test('Non render preloader', () => {
  render(<Preloader isLoader={false} />);
  const preloaderElem = screen.queryByAltText(/Preloader/i);
  expect(preloaderElem).not.toBeInTheDocument();
});
