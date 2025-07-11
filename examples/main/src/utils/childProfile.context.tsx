import { createContext, useContext, useState } from 'react';
import { ChildProfile } from './types';
import { WllamaStorage } from './utils';

interface ChildProfileContextValue {
  childProfile: ChildProfile;
  setChildProfile: (profile: ChildProfile) => void;
  updateChildProfile: (updates: Partial<ChildProfile>) => void;
  hasProfile: boolean;
}

const defaultProfile: ChildProfile = {
  name: '',
  age: 0,
  gender: '',
  functionalAssessment: '',
  ndisPlan: '',
};

const ChildProfileContext = createContext<ChildProfileContextValue>({} as any);

export const ChildProfileProvider = ({ children }: any) => {
  const [childProfile, _setChildProfile] = useState<ChildProfile>(
    WllamaStorage.load('child_profile', defaultProfile)
  );

  // proxy function for saving to localStorage
  const setChildProfile = (profile: ChildProfile) => {
    WllamaStorage.save('child_profile', profile);
    _setChildProfile(profile);
  };

  const updateChildProfile = (updates: Partial<ChildProfile>) => {
    const updatedProfile = { ...childProfile, ...updates };
    setChildProfile(updatedProfile);
  };

  const hasProfile = !!(
    childProfile.name &&
    childProfile.age > 0 &&
    childProfile.gender &&
    childProfile.functionalAssessment &&
    childProfile.ndisPlan
  );

  return (
    <ChildProfileContext.Provider
      value={{
        childProfile,
        setChildProfile,
        updateChildProfile,
        hasProfile,
      }}
    >
      {children}
    </ChildProfileContext.Provider>
  );
};

export const useChildProfile = () => useContext(ChildProfileContext);