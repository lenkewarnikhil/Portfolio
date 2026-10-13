import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App Component', () => {
  it('renders the main heading and skip-to-content link', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getAllByText(/Nikhil Lenkewar/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();
  });

  it('renders availability badge and hero CTA buttons', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByText(/Available for Opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Download CV/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy email address to clipboard/i })).toBeInTheDocument();
  });

  it('renders category filter buttons and filters projects on click', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const allBtn = screen.getByRole('tab', { name: /All Projects/i });
    const backendBtn = screen.getByRole('tab', { name: /Backend & APIs/i });
    const aiBtn = screen.getByRole('tab', { name: /AI & LLMs/i });
    const cloudBtn = screen.getByRole('tab', { name: /Cloud & Infrastructure/i });

    expect(allBtn).toBeInTheDocument();
    expect(backendBtn).toBeInTheDocument();
    expect(aiBtn).toBeInTheDocument();
    expect(cloudBtn).toBeInTheDocument();

    // Click AI filter tab
    fireEvent.click(aiBtn);
    expect(aiBtn).toHaveClass('is-active');
    expect(allBtn).not.toHaveClass('is-active');

    // Click Backend filter tab
    fireEvent.click(backendBtn);
    expect(backendBtn).toHaveClass('is-active');
    expect(aiBtn).not.toHaveClass('is-active');
  });
});
