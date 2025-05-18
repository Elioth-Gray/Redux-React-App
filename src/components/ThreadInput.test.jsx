/**
 * text scenario for ThreadInput component
 *
 * - ThreadInput component
 *   - Should handle title typing correctly
 *   - Should handle category typing correctly
 *   - Should handle content typing correctly
 *   - Should call onCreate function when create button is clicked
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import ThreadInput from './Threadinput';

expect.extend(matchers);

const dummyUser = {
  id: 'user-1',
  name: 'Dummy User',
  avatar: 'https://avatar.com/dummy.jpg',
};

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should handle title typing correctly', async () => {
    // arrange
    render(
      <BrowserRouter>
        <ThreadInput onCreate={() => {}} authUser={dummyUser} />
      </BrowserRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('Judul threadmu...');

    // action
    await userEvent.type(titleInput, 'React Tutorial');

    // assert
    expect(titleInput).toHaveValue('React Tutorial');
  });

  it('Should handle category typing correctly', async () => {
    // arrange
    render(
      <BrowserRouter>
        <ThreadInput onCreate={() => {}} authUser={dummyUser} />
      </BrowserRouter>,
    );
    const categoryInput = await screen.getByPlaceholderText(
      'Kategori threadmu...',
    );

    // action
    await userEvent.type(categoryInput, 'Belajar');

    // assert
    expect(categoryInput).toHaveValue('Belajar');
  });

  it('Should handle content typing correctly', async () => {
    // arrange
    render(
      <BrowserRouter>
        <ThreadInput onCreate={() => {}} authUser={dummyUser} />
      </BrowserRouter>,
    );
    const contentInput = await screen.getByPlaceholderText('Tulis threadmu...');

    // action
    await userEvent.type(contentInput, 'Halo aku redux');

    // assert
    expect(contentInput).toHaveValue('Halo aku redux');
  });

  it('Should call onCreate function when create button is clicked', async () => {
    // arrange
    const mockOnCreate = vi.fn();
    render(
      <BrowserRouter>
        <ThreadInput onCreate={mockOnCreate} authUser={dummyUser} />
      </BrowserRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('Judul threadmu...');
    await userEvent.type(titleInput, 'React Tutorial');
    const categoryInput = await screen.getByPlaceholderText(
      'Kategori threadmu...',
    );
    await userEvent.type(categoryInput, 'Belajar');
    const contentInput = await screen.getByPlaceholderText('Tulis threadmu...');
    await userEvent.type(contentInput, 'Halo aku redux');
    const createButton = await screen.getByRole('button', {
      name: /Buat Thread/i,
    });

    // action
    await userEvent.click(createButton);

    // assert
    expect(mockOnCreate).toHaveBeenCalledWith({
      title: 'React Tutorial',
      body: 'Halo aku redux',
      category: 'Belajar',
    });
  });
});
