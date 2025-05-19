import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../components/Navbar';
import authReducer from '../states/auth/reducer';
import '../index.css';

export default {
  title: 'Components/Navbar',
  component: Navbar,
};
const createMockStore = (authUser = null) => configureStore({
  reducer: {
    authUser: authReducer,
    users: (state = {}) => state,
    threads: (state = {}) => state,
    isPreload: (state = false) => state,
    threadDetail: (state = {}) => state,
    leaderboards: (state = {}) => state,
    loadingBar: (state = {}) => state,
  },
  preloadedState: {
    authUser,
  },
});

function Template(args, { globals }) {
  const store = createMockStore(args.authUser);

  return (
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
}

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  authUser: null,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authUser: {
    name: 'John Doe',
    email: 'john@example.com',
  },
};
