import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Droplets, Bot, User, Trash2 } from 'lucide-react';
import { useAI } from '../../context/AIContext';

// Trong JavaScript, không có interface. Thay vào đó, bạn có thể sử dụng JSDoc
// để ghi lại cấu trúc của đối tượng `Message` như sau:
/**
 * @typedef {object} Message
 * @property {number} id
 * @property {string} text
 * @property {boolean} isUser
 * @property {Date} timestamp
 */

const ChatBox = () => {
  const {
    messages,
    isLoading,
    error,
    isConnected,
    sendMessage,
    clearMessages,
    settings,
    updateSettings
  } = useAI();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    await sendMessage(inputValue.trim());
    setInputValue('');
  };

  // Quick actions for blood donation topics
  const quickActions = [
    {
      text: 'Tôi có thể hiến máu được không?',
      icon: Heart,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      hoverColor: 'hover:bg-red-200'
    },
    {
      text: 'Quy trình hiến máu như thế nào?',
      icon: Droplets,
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      hoverColor: 'hover:bg-pink-200'
    },
    {
      text: 'Điều kiện sức khỏe để hiến máu?',
      icon: Heart,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-200'
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Blood Buddy AI</h3>
              <span className="text-white/80 text-sm flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 inline-block ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                {isConnected ? 'Đang hoạt động' : 'Chưa kết nối'}
              </span>
            </div>
          </div>
          <button
            onClick={clearMessages}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-72 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Bắt đầu trò chuyện với AI về hiến máu</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' : 'bg-white border border-gray-200 text-gray-800'} shadow-sm`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>{new Date(message.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-2xl bg-red-100 border border-red-200 text-red-800">
              <p className="text-sm">Lỗi: {error}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập câu hỏi về hiến máu..."
            className="flex-1 px-2 py-1 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
            disabled={false}
          />
          <button
            type="submit"
            disabled={false}
            className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => setInputValue(action.text)}
              disabled={false}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${action.bgColor} ${action.textColor} ${action.hoverColor}`}
            >
              <action.icon className="w-3 h-3 inline mr-1" />
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;