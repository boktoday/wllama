@@ .. @@
     <ScreenWrapper>
       <div className="guide-text pt-16">
-        <h1 className="text-2xl font-bold mb-4">Wllama 🦙</h1>
+        <h1 className="text-2xl font-bold mb-4">Privacy by Design Chat 🔒</h1>
 
         <div className="mb-3">
-          Wllama is a project based on{' '}
-          <a
-            href="https://github.com/ggerganov/llama.cpp"
-            target="_blank"
-            rel="noopener"
-          >
-            llama.cpp
-          </a>
-          . It enables running LLM inference directly on browser by leveraging
-          the power of <b>WebAssembly</b>. It accepts GGUF as model format.
+          Privacy by Design Chat is a secure, privacy-focused chat application that runs entirely in your browser. 
+          Your conversations and data never leave your device, ensuring complete privacy and confidentiality.
         </div>
 
         <div className="mb-3">
-          Please note that:
+          Key privacy features:
           <ul>
             <li>
-              Due to WebAssembly overhead, performance will not be as good as
-              running llama.cpp in native. Performance degradation can range
-              from 25% to 50%.
+              <b>Local Processing:</b> All AI processing happens directly in your browser - no data is sent to external servers.
             </li>
             <li>
-              Due to memory constraint of WebAssembly and emscripten, models
-              larger than 2GB will need to be split.{' '}
-              <a
-                href="https://github.com/ngxson/wllama?tab=readme-ov-file#split-model"
-                target="_blank"
-                rel="noopener"
-              >
-                Click here to learn more
-              </a>
+              <b>No Data Collection:</b> Your conversations, child profile, and personal information are stored only on your device.
             </li>
             <li>
-              Large model may not fit into RAM, (again) due to memory constraint
-              of WebAssembly.
+              <b>Offline Capable:</b> Once loaded, the application can work without an internet connection.
             </li>
-            <li>Running on smartphone maybe buggy.</li>
             <li>
-              <b>WebGPU is not supported</b>. We're still working hard to add
-              support for WebGPU.
+              <b>Secure by Default:</b> No accounts, no tracking, no data sharing - your privacy is guaranteed.
             </li>
           </ul>
         </div>
 
         <div className="mb-3">
-          To get started, go to{' '}
+          To begin using the application:
+          <ol className="list-decimal pl-4 mt-2">
+            <li className="mb-2">
+              First, complete your{' '}
+              <button
+                className="btn btn-sm btn-primary btn-outline"
+                onClick={() => navigateTo(Screen.PROFILE)}
+              >
+                Child Profile
+              </button>{' '}
+              to enable personalized assistance.
+            </li>
+            <li className="mb-2">
+              Then, go to{' '}
+              <button
+                className="btn btn-sm btn-primary btn-outline"
+                onClick={() => navigateTo(Screen.MODEL)}
+              >
+                Manage models
+              </button>{' '}
+              to download and load an AI model.
+            </li>
+            <li>
+              Once setup is complete, you can start chatting with confidence that your data remains private.
+            </li>
+          </ol>
+        </div>
+
+        <h1 className="text-xl font-bold mb-4 mt-6">About This Application</h1>
+
+        <div className="mb-3">
+          This application is designed to provide personalized assistance for NDIS planning and functional assessments 
+          while maintaining the highest standards of privacy and data protection. All processing happens locally in your 
+          browser using advanced WebAssembly technology.
+        </div>
+
+        <div className="mb-3">
+          To get started with model selection, go to{' '}
           <button
             className="btn btn-sm btn-primary btn-outline"
             onClick={() => navigateTo(Screen.MODEL)}
           >
             Manage models
-          </button>{' '}
-          page to select a model.
-        </div>
-
-        <h1 className="text-xl font-bold mb-4 mt-6">Reporting bugs</h1>
-
-        <div className="mb-3">
-          Wllama is in development and many bugs are expected to happen. If you
-          find a bug, please{' '}
-          <a
-            href="https://github.com/ngxson/wllama/issues"
-            target="_blank"
-            rel="noopener"
-          >
-            open a issue
-          </a>{' '}
-          with log copied from{' '}
-          <button
-            className="btn btn-sm btn-primary btn-outline"
-            onClick={() => navigateTo(Screen.LOG)}
-          >
-            Debug log
-          </button>
+          </button>{' '}
+          to download and select an AI model.
         </div>
       </div>
     </ScreenWrapper>