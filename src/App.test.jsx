import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getAllByText(/Nikhil Lenkewar/i).length).toBeGreaterThan(0);
  });
});
