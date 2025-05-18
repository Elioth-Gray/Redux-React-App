/**
 * text scenario for LoginInput component
 *
 * - RegisterInput component
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call login function when login button is clicked
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('email@example.com');

    // action
    await userEvent.type(emailInput, 'email@test.com');

    // assert
    expect(emailInput).toHaveValue('email@test.com');
  });

  it('Should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('***********');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('Should call login function when login button is clicked', async () => {
    // arrange
    // mock login
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('email@example.com');
    await userEvent.type(emailInput, 'email@test.com');
    const passwordInput = await screen.getByPlaceholderText('***********');
    await userEvent.type(passwordInput, 'password123');
    const loginButton = await screen.getByRole('button', { name: /masuk/i });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'email@test.com',
      password: 'password123',
    });
  });
});
