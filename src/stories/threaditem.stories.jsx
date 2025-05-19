import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

const mockOwner = {
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const mockThreadData = {
  id: 'thread-1',
  title: 'How to Use React Hooks Effectively',
  body: 'React Hooks are a powerful feature that lets you use state and other React features without writing a class. In this thread, I want to share some best practices for using hooks effectively in your applications. First, always follow the rules of hooks: only call hooks at the top level and only call hooks from React functions. Second, use custom hooks to reuse stateful logic between components. Third, remember to provide dependencies to useEffect, useMemo, and useCallback to prevent unexpected behavior. What are your experiences with React Hooks?',
  category: 'react',
  createdAt: '2023-05-01T12:00:00.000Z',
  upVotesBy: ['user-1', 'user-2', 'user-3'],
  downVotesBy: ['user-4'],
  totalComments: 42,
  owner: mockOwner,
};

const mockHandlers = {
  upVote: () => {},
  downVote: () => {},
  neutralizeVote: () => {},
};

function Template(args) {
  return <ThreadItem {...args} />;
}

export const NoVote = Template.bind({});
NoVote.args = {
  ...mockThreadData,
  ...mockHandlers,
  authUser: 'user-9',
};

export const Upvoted = Template.bind({});
Upvoted.args = {
  ...mockThreadData,
  ...mockHandlers,
  authUser: 'user-1',
};

// Logged in and downvoted
export const Downvoted = Template.bind({});
Downvoted.args = {
  ...mockThreadData,
  ...mockHandlers,
  authUser: 'user-4',
};

// Thread with shorter content
export const ShortContent = Template.bind({});
ShortContent.args = {
  ...mockThreadData,
  ...mockHandlers,
  body: 'A short thread body for testing truncation.',
  authUser: 'user-9',
};

export const NoComments = Template.bind({});
NoComments.args = {
  ...mockThreadData,
  ...mockHandlers,
  totalComments: 0,
  authUser: 'user-9',
};

export const ManyVotes = Template.bind({});
ManyVotes.args = {
  ...mockThreadData,
  ...mockHandlers,
  upVotesBy: Array(25)
    .fill()
    .map((_, i) => `user-${i + 10}`),
  downVotesBy: Array(10)
    .fill()
    .map((_, i) => `user-${i + 50}`),
  authUser: 'user-9',
};
