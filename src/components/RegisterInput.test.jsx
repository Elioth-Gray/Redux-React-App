/**
 * text scenario for RegisterInput component
 *
 * - RegisterInput component
 *   - Should handle name typing correctly
 *   - Should handle email typing correctly
 *   - Should handle password typing correctly
 *   - Should call register function when register button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput login={() => {}}></RegisterInput>);
    const nameInput = await screen.getByPlaceholderText('Nama Lengkap');

    // action
    await userEvent.type(nameInput, 'Budi Santoso');

    // assert
    expect(nameInput).toHaveValue('Budi Santoso');
  });

  it('Should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}}></RegisterInput>);
    const emailInput = await screen.getByPlaceholderText('email@example.com');

    // action
    await userEvent.type(emailInput, 'email@test.com');

    // assert
    expect(emailInput).toHaveValue('email@test.com');
  });

  it('Should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}}></RegisterInput>);
    const passwordInput = await screen.getByPlaceholderText('***********');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('Should call register function when login button is clicked', async () => {
    // arrange
    // mock login
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister}></RegisterInput>);
    const nameInput = await screen.getByPlaceholderText('Nama Lengkap');
    await userEvent.type(nameInput, 'Budi Santoso');
    const emailInput = await screen.getByPlaceholderText('email@example.com');
    await userEvent.type(emailInput, 'email@test.com');
    const passwordInput = await screen.getByPlaceholderText('***********');
    await userEvent.type(passwordInput, 'password123');
    const loginButton = await screen.getByRole('button', { name: /Daftar/i });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'Budi Santoso',
      email: 'email@test.com',
      password: 'password123',
    });
  });
});
