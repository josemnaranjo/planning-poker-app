import React from 'react';
import { useStore } from './store/index.js';
import { useSocketListeners } from './hooks/useSocketListeners.js';
import { LobbyPage } from './components/lobby/LobbyPage.js';
import { SetupPage } from './components/setup/SetupPage.js';
import { VotingPage } from './components/voting/VotingPage.js';
import { SummaryPage } from './components/summary/SummaryPage.js';

const App: React.FC = () => {
  // Initialize socket listeners ONCE at the app root
  useSocketListeners();

  const { room } = useStore();

  if (!room) return <LobbyPage />;
  if (room.status === 'setup') return <SetupPage />;
  if (room.status === 'active') return <VotingPage />;
  if (room.status === 'finished') return <SummaryPage />;

  return <LobbyPage />;
};

export default App;
