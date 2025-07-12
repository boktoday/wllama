import { useState } from 'react';
import { Wllama } from '@wllama/wllama';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faQuestionCircle,
  faBrain,
  faBug,
  faArrowUpRightFromSquare,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

// Model types
enum ModelState {
  NOT_DOWNLOADED,
  DOWNLOADING,
  READY,
  LOADING,
  LOADED,
}

interface Model {
  url: string;
  size: number;
  state: ModelState;
  downloadPercent: number;
  hfModel: string;
  hfPath: string;
}

// Define the inference parameters
interface InferenceParams {
  nThreads: number;
  nContext: number;
  nPredict: number;
  temperature: number;
}

// Import wllama configuration
const WLLAMA_CONFIG_PATHS = {
  'single-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.2/src/single-thread/wllama.wasm',
  'multi-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.2/src/multi-thread/wllama.wasm',
};

function App() {
  const [activeScreen, setActiveScreen] = useState('model');
  const [conversations, setConversations] = useState<string[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedModel, setLoadedModel] = useState<Model | null>(null);
  const [wllamaInstance, setWllamaInstance] = useState<Wllama | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatOutput, setChatOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inferenceParams, setInferenceParams] = useState<InferenceParams>({
    nThreads: -1,
    nContext: 4096,
    nPredict: 4096,
    temperature: 0.2
  });
  
  // Mock models data
  const [models, setModels] = useState<Model[]>([
    {
      url: 'https://huggingface.co/ngxson/SmolLM2-360M-Instruct-Q8_0-GGUF/resolve/main/smollm2-360m-instruct-q8_0.gguf',
      size: 386404992,
      state: ModelState.NOT_DOWNLOADED,
      downloadPercent: 0,
      hfModel: 'ngxson/SmolLM2-360M-Instruct-Q8_0-GGUF',
      hfPath: 'smollm2-360m-instruct-q8_0.gguf'
    },
    {
      url: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q8_0.gguf',
      size: 675710816,
      state: ModelState.NOT_DOWNLOADED,
      downloadPercent: 0,
      hfModel: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
      hfPath: 'qwen2.5-0.5b-instruct-q8_0.gguf'
    }
  ]);

  const handleParamChange = (key: keyof InferenceParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInferenceParams({
      ...inferenceParams,
      [key]: parseFloat(e.target.value || '0')
    });
  };

  const resetParams = () => {
    setInferenceParams({
      nThreads: -1,
      nContext: 4096,
      nPredict: 4096,
      temperature: 0.2
    });
  };

  const handleDownload = async (index: number) => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    // Simulate download progress
    const updatedModels = [...models];
    updatedModels[index] = {
      ...updatedModels[index],
      state: ModelState.DOWNLOADING
    };
    setModels(updatedModels);
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.05;
      const newModels = [...updatedModels];
      newModels[index] = {
        ...newModels[index],
        downloadPercent: Math.min(progress, 1)
      };
      setModels(newModels);
      
      if (progress >= 1) {
        clearInterval(interval);
        newModels[index] = {
          ...newModels[index],
          state: ModelState.READY,
          downloadPercent: 1
        };
        setModels(newModels);
        setIsDownloading(false);
      }
    }, 200);
  };

  const handleLoadModel = async (index: number) => {
    if (isLoading || loadedModel) return;
    
    setIsLoading(true);
    
    // Update model state
    const updatedModels = [...models];
    updatedModels[index] = {
      ...updatedModels[index],
      state: ModelState.LOADING
    };
    setModels(updatedModels);
    
    try {
      // Initialize wllama
      const wllama = new Wllama(WLLAMA_CONFIG_PATHS);
      
      // Simulate loading the model (in a real app, this would actually load the model)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update state
      setWllamaInstance(wllama);
      setLoadedModel(updatedModels[index]);
      
      updatedModels[index] = {
        ...updatedModels[index],
        state: ModelState.LOADED
      };
      setModels(updatedModels);
      
      // Switch to chat screen
      setActiveScreen('chat');
    } catch (error) {
      console.error('Error loading model:', error);
      
      // Reset model state on error
      updatedModels[index] = {
        ...updatedModels[index],
        state: ModelState.READY
      };
      setModels(updatedModels);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnloadModel = async () => {
    if (!loadedModel) return;
    
    // Update model state
    const updatedModels = [...models];
    const modelIndex = updatedModels.findIndex(m => m.url === loadedModel.url);
    
    if (modelIndex !== -1) {
      updatedModels[modelIndex] = {
        ...updatedModels[modelIndex],
        state: ModelState.READY
      };
      setModels(updatedModels);
    }
    
    // Clean up wllama instance
    if (wllamaInstance) {
      try {
        await wllamaInstance.exit();
      } catch (error) {
        console.error('Error unloading model:', error);
      }
    }
    
    setWllamaInstance(null);
    setLoadedModel(null);
  };

  const handleSendMessage = async () => {
    if (!wllamaInstance || !chatInput.trim() || isGenerating) return;
    
    setIsGenerating(true);
    
    // Create a new conversation if needed
    if (!currentConversation) {
      const newConv = chatInput.substring(0, 30) + (chatInput.length > 30 ? '...' : '');
      setConversations([newConv, ...conversations]);
      setCurrentConversation(newConv);
    }
    
    // Store the user input
    const userInput = chatInput;
    setChatInput('');
    
    // In a real app, this would use the actual wllama API
    // Here we're just simulating a response
    setChatOutput('');
    
    // Simulate typing effect
    const response = "I'm a simulated AI assistant. This is a demo of the wllama interface. In a real implementation, this would use the actual wllama library to generate a response based on your input.";
    let currentOutput = '';
    
    for (let i = 0; i < response.length; i++) {
      currentOutput += response[i];
      setChatOutput(currentOutput);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    setIsGenerating(false);
  };

  const toHumanReadableSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col">
        <div className="p-4 text-xl font-bold">wllama</div>
        
        <div className="flex-grow overflow-auto p-4">
          <div className="mb-4">
            <button className="w-full text-left p-2 rounded hover:bg-gray-700 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> New conversation
            </button>
          </div>
          
          <div className="space-y-1">
            {conversations.map((conv, index) => (
              <button 
                key={index}
                className={`w-full text-left p-2 rounded hover:bg-gray-700 flex items-center justify-between ${
                  currentConversation === conv ? 'bg-gray-700' : ''
                }`}
                onClick={() => setCurrentConversation(conv)}
              >
                <span className="truncate">{conv}</span>
                <FontAwesomeIcon icon={faTrashAlt} className="opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2">
            <button 
              className={`w-full text-left p-2 rounded hover:bg-gray-700 flex items-center ${
                activeScreen === 'guide' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveScreen('guide')}
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Guide
            </button>
            
            <button 
              className={`w-full text-left p-2 rounded hover:bg-gray-700 flex items-center ${
                activeScreen === 'model' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveScreen('model')}
            >
              <FontAwesomeIcon icon={faBrain} className="mr-2" /> Manage models
            </button>
            
            <button 
              className={`w-full text-left p-2 rounded hover:bg-gray-700 flex items-center ${
                activeScreen === 'log' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveScreen('log')}
            >
              <FontAwesomeIcon icon={faBug} className="mr-2" /> Debug log
            </button>
            
            <a 
              href="https://github.com/ngxson/wllama" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full text-left p-2 rounded hover:bg-gray-700 flex items-center"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" /> Github
            </a>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            Version 2.3.2
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow overflow-auto">
        {activeScreen === 'model' && (
          <div className="p-8">
            {loadedModel && (
              <div className="bg-green-800 text-white p-4 rounded mb-4">
                Model loaded: {loadedModel.hfPath}
                <button 
                  className="ml-4 bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
                  onClick={handleUnloadModel}
                >
                  Unload
                </button>
              </div>
            )}
            
            <h1 className="text-2xl mb-4">Inference parameters</h1>
            
            <div className="space-y-4 mb-4">
              <div className="bg-gray-800 p-4 rounded">
                <label className="block mb-1"># threads</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 p-2 rounded"
                  placeholder="(auto detected)"
                  value={inferenceParams.nThreads === -1 ? '' : inferenceParams.nThreads}
                  onChange={handleParamChange('nThreads')}
                />
              </div>
              
              <div className="bg-gray-800 p-4 rounded">
                <label className="block mb-1">Context size</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 p-2 rounded"
                  value={inferenceParams.nContext}
                  onChange={handleParamChange('nContext')}
                />
              </div>
              
              <div className="bg-gray-800 p-4 rounded">
                <label className="block mb-1">Max generated tokens</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 p-2 rounded"
                  value={inferenceParams.nPredict}
                  onChange={handleParamChange('nPredict')}
                />
              </div>
              
              <div className="bg-gray-800 p-4 rounded">
                <label className="block mb-1">Temperature</label>
                <input 
                  type="number" 
                  step="0.05"
                  className="w-full bg-gray-700 p-2 rounded"
                  value={inferenceParams.temperature}
                  onChange={handleParamChange('temperature')}
                />
              </div>
            </div>
            
            <div className="mb-8">
              <button 
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-2"
                onClick={resetParams}
              >
                Reset params
              </button>
              
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Clear cache
              </button>
            </div>
            
            <h1 className="text-2xl mb-4">
              Custom models
              <button className="ml-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded text-sm text-white">
                + Add GGUF
              </button>
            </h1>
            
            <h1 className="text-2xl mt-8 mb-4">Recommended models</h1>
            
            {models.map((m, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded mb-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold">{m.hfPath}</div>
                    <div className="text-sm text-gray-400">
                      HF repo: {m.hfModel}
                      <br />
                      Size: {toHumanReadableSize(m.size)}
                    </div>
                    
                    {m.state === ModelState.DOWNLOADING && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${m.downloadPercent * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs mt-1">Downloaded: {Math.round(m.downloadPercent * 100)}%</div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {m.state === ModelState.NOT_DOWNLOADED && (
                      <button 
                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
                        onClick={() => handleDownload(index)}
                        disabled={isDownloading}
                      >
                        Download
                      </button>
                    )}
                    
                    {m.state === ModelState.DOWNLOADING && (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                    
                    {m.state === ModelState.READY && (
                      <>
                        <button 
                          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white mr-2" 
                          onClick={() => handleLoadModel(index)}
                          disabled={isLoading || !!loadedModel}
                        >
                          Load model
                        </button>
                      </>
                    )}
                    
                    {m.state === ModelState.LOADING && (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                    
                    {m.state === ModelState.LOADED && (
                      <div className="text-green-400 font-bold">
                        Loaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeScreen === 'chat' && (
          <div className="p-8 h-full flex flex-col">
            <h1 className="text-2xl mb-4">Chat</h1>
            
            {!loadedModel ? (
              <div className="bg-yellow-800 text-white p-4 rounded mb-4">
                Please load a model first to start chatting.
              </div>
            ) : (
              <>
                <div className="flex-grow bg-gray-800 p-4 rounded mb-4 overflow-auto">
                  {currentConversation && (
                    <div>
                      <div className="mb-4">
                        <div className="font-bold">You:</div>
                        <div className="pl-4">{chatInput || "(Your message will appear here)"}</div>
                      </div>
                      
                      {chatOutput && (
                        <div>
                          <div className="font-bold">AI:</div>
                          <div className="pl-4">{chatOutput}</div>
                        </div>
                      )}
                      
                      {isGenerating && !chatOutput && (
                        <div>
                          <div className="font-bold">AI:</div>
                          <div className="pl-4">
                            <div className="animate-pulse">Thinking...</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!currentConversation && (
                    <div className="text-center text-gray-400 mt-20">
                      Start a new conversation by typing a message below.
                    </div>
                  )}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow bg-gray-700 p-2 rounded-l"
                    placeholder="Type your message here..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isGenerating}
                  />
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r"
                    onClick={handleSendMessage}
                    disabled={isGenerating || !chatInput.trim()}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;