import React from 'react';
import ChatScreen from './components/ChatScreen';
import GuideScreen from './components/GuideScreen';
import LogScreen from './components/LogScreen';
import ModelScreen from './components/ModelScreen';
import ChildProfileForm from './components/ChildProfileForm';
import LegalPrivacyScreen from './components/LegalPrivacyScreen';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { MessagesProvider } from './utils/messages.context';
import { ChildProfileProvider } from './utils/childProfile.context';
import { Screen } from './utils/types';
import { useWllama, WllamaProvider } from './utils/wllama.context';
import './utils/benchmark';

function App() {
  return (
    <ChildProfileProvider>
      <MessagesProvider>
        <WllamaProvider>
          <InnerApp />
        </WllamaProvider>
      </MessagesProvider>
    </ChildProfileProvider>
  );
}

function InnerApp() {
  const { currScreen } = useWllama();
  const { navigateTo } = useWllama();

  // Handle footer navigation
  React.useEffect(() => {
    const handleNavigateToLegal = () => {
      navigateTo(Screen.LEGAL);
    };

    window.addEventListener('navigate-to-legal', handleNavigateToLegal);
    return () => {
      window.removeEventListener('navigate-to-legal', handleNavigateToLegal);
    };
  }, [navigateTo]);

  return (
    <div className="flex flex-col drawer min-h-screen w-screen">
      <Navbar />
      <div className="grow flex flex-row lg:drawer-open min-h-[calc(100vh-8rem)]">
        <Sidebar>
          {currScreen === Screen.MODEL && <ModelScreen />}
          {currScreen === Screen.CHAT && <ChatScreen />}
          {currScreen === Screen.GUIDE && <GuideScreen />}
          {currScreen === Screen.LOG && <LogScreen />}
          {currScreen === Screen.PROFILE && <ChildProfileForm />}
          {currScreen === Screen.LEGAL && <LegalPrivacyScreen />}
        </Sidebar>
      </div>
      <Footer />
    </div>
  );
}

export default App;