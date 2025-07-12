import { useState } from 'react';
import { useChildProfile } from '../utils/childProfile.context';
import { Screen } from '../utils/types';
import { useWllama } from '../utils/wllama.context';
import ScreenWrapper from './ScreenWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ChildProfileForm() {
  const { childProfile, updateChildProfile, hasProfile } = useChildProfile();
  const { navigateTo } = useWllama();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate a brief save operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSaving(false);
    
    // Navigate to chat if profile is complete
    if (hasProfile) {
      navigateTo(Screen.CHAT);
    }
  };

  const handleInputChange = (field: keyof typeof childProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = field === 'age' ? parseInt(e.target.value) || 0 : e.target.value;
    updateChildProfile({ [field]: value });
  };

  return (
    <ScreenWrapper>
      <div className="child-profile-form pt-8">
        <div className="flex items-center mb-6">
          <FontAwesomeIcon icon={faUser} className="text-2xl text-primary mr-3" />
          <h1 className="text-2xl font-bold">Child Profile</h1>
          {hasProfile && (
            <FontAwesomeIcon icon={faCheck} className="text-green-500 ml-3" />
          )}
        </div>

        <div className="mb-4 p-4 bg-base-200 rounded-lg">
          <p className="text-sm">
            Please provide your child's information to enable personalized assistance 
            with their functional assessment and NDIS plan. This information is stored 
            locally in your browser and is not shared with anyone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Child's Name *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your child's name"
              value={childProfile.name}
              onChange={handleInputChange('name')}
              required
            />
          </div>

          {/* Age and Gender Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Age *</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Age"
                min="0"
                max="100"
                value={childProfile.age || ''}
                onChange={handleInputChange('age')}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Gender *</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={childProfile.gender}
                onChange={handleInputChange('gender')}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* General Background Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">General Background</span>
              <span className="label-text-alt">
                Optional: General information about your child's background, interests, or other relevant details
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 w-full"
              placeholder="Optional: Share any general background information about your child, such as their interests, hobbies, school situation, family context, or any other details you think might be helpful..."
              value={childProfile.generalBackground}
              onChange={handleInputChange('generalBackground')}
            />
          </div>

          {/* Functional Assessment Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Functional Assessment</span>
              <span className="label-text-alt">
                Optional: Copy and paste your child's functional assessment report
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 w-full"
              placeholder="Optional: Paste your child's functional assessment here. This should include details about their current abilities, support needs, and any relevant assessments from healthcare professionals..."
              value={childProfile.functionalAssessment}
              onChange={handleInputChange('functionalAssessment')}
            />
          </div>

          {/* NDIS Plan Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">NDIS Plan</span>
              <span className="label-text-alt">
                Optional: Copy and paste your child's current NDIS plan
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 w-full"
              placeholder="Optional: Paste your child's NDIS plan here. This should include their goals, funded supports, budget allocations, and any specific requirements..."
              value={childProfile.ndisPlan}
              onChange={handleInputChange('ndisPlan')}
            />
          </div>

          {/* Other Information Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Other Information</span>
              <span className="label-text-alt">
                Optional: Any additional information you'd like to share
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 w-full"
              placeholder="Optional: Share any other relevant information, concerns, questions, or details that might help provide better assistance..."
              value={childProfile.otherInformation}
              onChange={handleInputChange('otherInformation')}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isSaving}
            >
              {isSaving && <span className="loading loading-spinner"></span>}
              {hasProfile ? 'Update Profile' : 'Save Profile'}
            </button>
            
            {hasProfile && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo(Screen.CHAT)}
              >
                Go to Chat
              </button>
            )}
          </div>
        </form>

        {!hasProfile && (
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-warning-content">
              <strong>Note:</strong> Only name, age, and gender are required to enable 
              the chat functionality. All other fields are optional but help provide better assistance. Your information is stored locally and never shared.
            </p>
          </div>
        )}
      </div>
    </ScreenWrapper>
  );
}