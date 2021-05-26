import React from 'react';
import { render, screen } from '@testing-library/react';
import Paginator from '../components/common/Paginator/Paginator';

describe('Paginator', () => {
  it('Render component', async () => {
    const { unmount } = render(
      <Paginator
        pages={[
          <span key="1">1</span>,
          <span key="2">2</span>,
          <span key="3">3</span>,
        ]}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    unmount();
  });
});
