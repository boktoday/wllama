import { Screen } from '../utils/types';
import { useWllama } from '../utils/wllama.context';
import ScreenWrapper from './ScreenWrapper';

export default function GuideScreen() {
  const { navigateTo } = useWllama();

  return (
    <ScreenWrapper>
      <div className="guide-text pt-16">
        <h1 className="text-2xl font-bold mb-4">Privacy by Design Chat 🔒</h1>

        <div className="mb-3">
          Privacy by Design Chat is a secure, privacy-focused chat application that runs entirely in your browser. 
          Your conversations and data never leave your device, ensuring complete privacy and confidentiality.
        </div>

        <div className="mb-3">
          Key privacy features:
          <ul>
            <li>
              <b>Local Processing:</b> All AI processing happens directly in your browser - no data is sent to external servers.
            </li>
            <li>
              <b>No Data Collection:</b> Your conversations, child profile, and personal information are stored only on your device.
            </li>
            <li>
              <b>Offline Capable:</b> Once loaded, the application can work without an internet connection.
            </li>
            <li>
              <b>Secure by Default:</b> No accounts, no tracking, no data sharing - your privacy is guaranteed.
            </li>
          </ul>
        </div>

        <div className="mb-3">
          To begin using the application:
          <ol className="list-decimal pl-4 mt-2">
            <li className="mb-2">
              First, complete your{' '}
              <button
                className="btn btn-sm btn-primary btn-outline"
                onClick={() => navigateTo(Screen.PROFILE)}
              >
                Child Profile
              </button>{' '}
              to enable personalized assistance.
            </li>
            <li className="mb-2">
              Then, go to{' '}
              <button
                className="btn btn-sm btn-primary btn-outline"
                onClick={() => navigateTo(Screen.MODEL)}
              >
                Manage models
              </button>{' '}
              to download and load an AI model.
            </li>
            <li>
              Once setup is complete, you can start chatting with confidence that your data remains private.
            </li>
          </ol>
        </div>

        <h1 className="text-xl font-bold mb-4 mt-6">About This Application</h1>

        <div className="mb-3">
          This application is designed to provide personalized assistance for NDIS planning and functional assessments 
          while maintaining the highest standards of privacy and data protection. All processing happens locally in your 
          browser using advanced WebAssembly technology.
        </div>

        <div className="mb-3">
          To get started with model selection, go to{' '}
          <button
            className="btn btn-sm btn-primary btn-outline"
            onClick={() => navigateTo(Screen.MODEL)}
          >
            Manage models
          </button>{' '}
          to download and select an AI model.
        </div>
      </div>
    </ScreenWrapper>
  );
}
