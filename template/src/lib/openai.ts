import { Configuration, OpenAIApi } from 'openai';

let openaiInstance: OpenAIApi | null = null;

export const initOpenAI = (apiKey: string) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  openaiInstance = new OpenAIApi(configuration);
};



export const getOpenAIInstance = () => {
  if (!openaiInstance) {
    throw new Error('OpenAI API has not been initialized. Please provide an API key.');
  }
  return openaiInstance;
};

export const createCompletion = async (prompt: string, options?: {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}) => {
  const openai = getOpenAIInstance();
  const response = await openai.createCompletion({
    model: options?.model || 'text-davinci-003',
    prompt,
    max_tokens: options?.maxTokens || 150,
    temperature: options?.temperature || 0.7,
  });
  return response.data;
};


export const createChatCompletion = async (messages: Array<{
  role: 'system' | 'user' | 'assistant';
  content: string;
}>, options?: {
  model?: string;
  temperature?: number;
}) => {
  const openai = getOpenAIInstance();
  const response = await openai.createChatCompletion({
    model: options?.model || 'gpt-3.5-turbo',
    messages,
    temperature: options?.temperature || 0.7,
  });
  return response.data;
};