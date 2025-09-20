// API endpoint для ChatGPT
// В реальном приложении этот файл должен быть на сервере

export const chatGPTConfig = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here',
  apiUrl: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  maxTokens: 1000,
  temperature: 0.7
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatGPTRequest {
  messages: ChatMessage[];
}

export interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Функция для вызова ChatGPT API
export const callChatGPT = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await fetch(chatGPTConfig.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${chatGPTConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: chatGPTConfig.model,
        messages: messages,
        max_tokens: chatGPTConfig.maxTokens,
        temperature: chatGPTConfig.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatGPTResponse = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response from ChatGPT');
    }
  } catch (error) {
    console.error('Error calling ChatGPT:', error);
    throw error;
  }
};

// Функция для создания промпта на основе языка
export const createLanguagePrompt = (language: string): string => {
  switch (language) {
    case 'ИИ Жардамчы':
      return 'Отвечай на кыргызском языке. ';
    case 'AI Assistant':
      return 'Answer in English. ';
    default:
      return 'Отвечай на русском языке. ';
  }
};

// Системный промпт для физики
export const systemPrompt = (language: string): string => {
  const langPrompt = createLanguagePrompt(language);
  return `${langPrompt}Ты - эксперт по физике и STEM-образованию. 
  Отвечай на вопросы простым, понятным языком с примерами и формулами. 
  Используй эмодзи для лучшего восприятия. 
  Если вопрос не по физике, вежливо направь к физическим темам.
  Всегда давай практические примеры и объясняй сложные концепции простыми словами.`;
};
