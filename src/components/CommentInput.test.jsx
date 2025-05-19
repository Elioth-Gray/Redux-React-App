/**
 * text scenario for CommentInput component
 *
 * - RegisterInput component
 *   - Should handle comment typing correctly
 *   - Should call onCreateClick function when send button is clicked
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

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
    render(
      <BrowserRouter>
        <CommentInput
          length={5}
          onCreate={() => {}}
          authUser={dummyUser}
          id="123"
        />
      </BrowserRouter>,
    );
    const commentInput = await screen.getByPlaceholderText(
      'Tulis Komentarmu...',
    );
    await userEvent.type(commentInput, 'Comment');
    expect(commentInput).toHaveValue('Comment');
  });

  it('Should call onCreateClick function when send button is clicked', async () => {
    const mockOnCreateClick = vi.fn();
    render(
      <BrowserRouter>
        <CommentInput
          length={5}
          onCreate={mockOnCreateClick}
          authUser={dummyUser}
          id="123"
        />
      </BrowserRouter>,
    );
    const commentInput = await screen.getByPlaceholderText(
      'Tulis Komentarmu...',
    );
    await userEvent.type(commentInput, 'Comment');
    const sendButton = await screen.getByRole('button', {
      name: /Kirim Komentar/i,
    });
    await userEvent.click(sendButton);
    expect(mockOnCreateClick).toHaveBeenCalledWith('Comment', '123');
  });
});
