/**
 * text scenario for CommentInput component
 *
 * - ThreadInput component
 *   - Should handle comment typing correctly
 *   - Should call onCreateClick function when send button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';
import { BrowserRouter } from 'react-router-dom';

expect.extend(matchers);

const dummyUser = {
  id: 'user-1',
  name: 'Dummy User',
  avatar: 'https://avatar.com/dummy.jpg',
};

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should handle comment typing correctly', async () => {
    // arrange
    render(
      <BrowserRouter>
        <CommentInput
          length={5}
          onCreate={() => {}}
          authUser={dummyUser}
          id={'123'}
        ></CommentInput>
      </BrowserRouter>,
    );
    const commentInput = await screen.getByPlaceholderText(
      'Tulis Komentarmu...',
    );

    // action
    await userEvent.type(commentInput, 'Comment');

    // assert
    expect(commentInput).toHaveValue('Comment');
  });

  it('Should call onCreateClick function when send button is clicked', async () => {
    // arrange
    const mockOnCreateClick = vi.fn();
    render(
      <BrowserRouter>
        <CommentInput
          length={5}
          onCreate={mockOnCreateClick}
          authUser={dummyUser}
          id={'123'}
        ></CommentInput>
      </BrowserRouter>,
    );
    const commentInput = await screen.getByPlaceholderText(
      'Tulis Komentarmu...',
    );
    await userEvent.type(commentInput, 'Comment');
    const sendButton = await screen.getByRole('button', {
      name: /Kirim Komentar/i,
    });

    // action
    await userEvent.click(sendButton);

    // assert
    expect(mockOnCreateClick).toHaveBeenCalledWith('Comment', '123');
  });
});
