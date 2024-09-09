import { render, screen } from '@testing-library/react';
import App from './App';

// tests are great but I didn't make any. Don't run this
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
