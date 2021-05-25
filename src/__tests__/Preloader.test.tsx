import React from 'react';
import { render, screen } from '@testing-library/react';
import Preloader from '../components/common/Preloader';

describe('Preloader', () => {
  it('Render component', () => {
    render(<Preloader isLoader={true} />);
    expect(screen.getByAltText(/Preloader/i)).toBeInTheDocument();
  });

  it('Hide component', () => {
    render(<Preloader isLoader={false} />);
    expect(screen.queryByAltText(/Preloader/i)).not.toBeInTheDocument();
  });
});
