import ScreenWrapper from './ScreenWrapper';

export default function LegalPrivacyScreen() {
  return (
    <ScreenWrapper>
      <div className="legal-privacy pt-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Legal & Privacy</h1>

        {/* Privacy Statement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy Statement</h2>
          <div className="prose prose-sm max-w-none">
            <p className="mb-4">
              <strong>Privacy by Design Chat</strong> is built with your privacy as the highest priority. 
              We are committed to protecting your personal information and ensuring complete data privacy.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Data Storage and Processing</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>All data is stored locally in your browser only</li>
              <li>No personal information is transmitted to external servers</li>
              <li>Your child's profile, conversations, and assessments remain on your device</li>
              <li>AI processing occurs entirely within your browser using WebAssembly technology</li>
              <li>No accounts, registration, or cloud storage are required or used</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Data Collection</h3>
            <p className="mb-4">
              We do not collect, store, or transmit any personal data. The information you enter 
              (including your child's profile, functional assessments, and NDIS plans) is stored 
              exclusively in your browser's local storage and never leaves your device.
            </p>

            <h3 className="text-lg font-semibold mb-2">Third-Party Services</h3>
            <p className="mb-4">
              This application does not use any third-party analytics, tracking, or data collection 
              services. No cookies are used for tracking purposes.
            </p>
          </div>
        </section>

        {/* AI Disclaimer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">AI Disclaimer</h2>
          <div className="prose prose-sm max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="font-semibold text-yellow-800">Important Notice</p>
              <p className="text-yellow-700">
                This AI assistant is designed to provide general information and support. 
                It should not replace professional medical, legal, or NDIS planning advice.
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-2">Limitations and Accuracy</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>AI responses may contain inaccuracies or outdated information</li>
              <li>The AI cannot provide medical diagnoses or treatment recommendations</li>
              <li>NDIS policies and procedures may change; always verify current requirements</li>
              <li>The AI's suggestions should be discussed with qualified professionals</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Professional Consultation</h3>
            <p className="mb-4">
              Always consult with qualified professionals including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your child's healthcare team</li>
              <li>NDIS planners and coordinators</li>
              <li>Occupational therapists and other specialists</li>
              <li>Legal advisors for complex NDIS matters</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Use at Your Own Risk</h3>
            <p className="mb-4">
              By using this application, you acknowledge that the AI-generated content is for 
              informational purposes only and you use it at your own discretion and risk.
            </p>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Legal Disclaimer</h2>
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-2">No Warranty</h3>
            <p className="mb-4">
              This application is provided "as is" without any warranties, express or implied. 
              Distincto Apps makes no representations about the accuracy, reliability, or 
              completeness of the information provided.
            </p>

            <h3 className="text-lg font-semibold mb-2">Limitation of Liability</h3>
            <p className="mb-4">
              Distincto Apps shall not be liable for any direct, indirect, incidental, special, 
              or consequential damages arising from the use of this application or reliance on 
              AI-generated content.
            </p>

            <h3 className="text-lg font-semibold mb-2">NDIS Information</h3>
            <p className="mb-4">
              This application is not affiliated with the National Disability Insurance Agency (NDIA). 
              NDIS policies, procedures, and requirements may change. Always refer to official NDIS 
              resources and consult with authorized NDIS representatives for current information.
            </p>

            <h3 className="text-lg font-semibold mb-2">Intellectual Property</h3>
            <p className="mb-4">
              This application is developed by Distincto Apps (ABN: 21 672 202 612). 
              All rights reserved unless otherwise specified.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="prose prose-sm max-w-none">
            <p>
              <strong>Distincto Apps</strong><br />
              ABN: 21 672 202 612<br />
              Made in Melbourne and Penang
            </p>
            <p className="mt-4">
              For questions about this privacy policy or the application, 
              please contact us through our official channels.
            </p>
          </div>
        </section>

        <div className="text-sm text-gray-500 mt-8 pt-4 border-t">
          Last updated: January 2025
        </div>
      </div>
    </ScreenWrapper>
  );
}