import React, { createContext, useContext, useReducer } from 'react';
import geminiService from '../service/geminiApi';

// Initial state
const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  isConnected: true,
  settings: {
    temperature: 0.7,
    maxTokens: 2048,
    topK: 40,
    topP: 0.95
  }
};

// Action types
const AI_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_MESSAGE: 'ADD_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
};

// Reducer
function aiReducer(state, action) {
  switch (action.type) {
    case AI_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case AI_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case AI_ACTIONS.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload], error: null };
    
    case AI_ACTIONS.CLEAR_MESSAGES:
      return { ...state, messages: [] };
    
    case AI_ACTIONS.UPDATE_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };
    
    default:
      return state;
  }
}

// Create context
const AIContext = createContext();

// Provider component
export function AIProvider({ children }) {
  const [state, dispatch] = useReducer(aiReducer, initialState);

  // Gửi message tới AI
  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    dispatch({ type: AI_ACTIONS.ADD_MESSAGE, payload: userMessage });
    dispatch({ type: AI_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: AI_ACTIONS.SET_ERROR, payload: null });
    try {
      const allMessages = [...state.messages, userMessage];
      const result = await geminiService.generateContentWithContext(allMessages, state.settings);
      if (result.success) {
        const aiMessage = {
          id: Date.now() + 1,
          content: result.text,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          usageMetadata: result.usageMetadata
        };
        dispatch({ type: AI_ACTIONS.ADD_MESSAGE, payload: aiMessage });
      } else {
        dispatch({ type: AI_ACTIONS.SET_ERROR, payload: result.error });
      }
    } catch (error) {
      dispatch({ type: AI_ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: AI_ACTIONS.SET_LOADING, payload: false });
    }
  };

  const clearMessages = () => dispatch({ type: AI_ACTIONS.CLEAR_MESSAGES });
  const updateSettings = (newSettings) => dispatch({ type: AI_ACTIONS.UPDATE_SETTINGS, payload: newSettings });

  const value = {
    ...state,
    sendMessage,
    clearMessages,
    updateSettings,
    isConnected: true
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
}

// Custom hook to use AI context
export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
} 