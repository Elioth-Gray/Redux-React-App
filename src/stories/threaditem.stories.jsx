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
  name: 'Asep Knalpot',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const mockThreadData = {
  id: 'thread-1',
  title: 'Cara menjadi pria sikma',
  body: 'Lelah jadi cowok biasa yang cuma bisa bilang "iya sayang"? Di sini kita bahas transformasi menuju level pria sikma: pria misterius, tenang, tapi punya aura yang bikin orang kepikiran seminggu. Mulai dari cara jalan yang pelan tapi mantap, pandangan tajam kayak mikirin eksistensi hidup, sampai skill ngasih nasihat random yang kedengarannya dalam padahal cuma hasil baca quotes Pinterest. Masuk sini kalau siap jadi enigma yang fashionable.',
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

export const Downvoted = Template.bind({});
Downvoted.args = {
  ...mockThreadData,
  ...mockHandlers,
  authUser: 'user-4',
};

export const ShortContent = Template.bind({});
ShortContent.args = {
  ...mockThreadData,
  ...mockHandlers,
  body: 'sikma itu sikma',
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
