/**
 * LLM Client Service
 * 
 * Provides centralized connection pooling, rate limiting, and API key management 
 * for LLM providers (e.g. Google Generative AI).
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Simple semaphore for rate limiting concurrent operations
 */
export class Semaphore {
  private permits: number;
  private queue: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.permits++;
    }
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

class LLMClientService {
  private geminiInstance: GoogleGenerativeAI | null = null;
  public readonly geminiSemaphore: Semaphore;

  constructor() {
    // Max 5 concurrent calls to prevent rate limits
    this.geminiSemaphore = new Semaphore(5);
  }

  /**
   * Get available Gemini API key
   */
  public getGeminiApiKey(): string {
    const keys = [
      process.env.GEMINI_API_KEY,
      process.env.GOOGLE_API_KEY,
      process.env.GOOGLE_GENERATIVE_AI_KEY,
    ].filter((k): k is string => !!k && k.length > 0);

    if (keys.length === 0) {
      throw new Error('No Gemini API key configured. Set GEMINI_API_KEY environment variable.');
    }

    return keys[0];
  }

  /**
   * Get a singleton instance of the Google Generative AI client
   */
  public getGeminiClient(): GoogleGenerativeAI {
    if (!this.geminiInstance) {
      this.geminiInstance = new GoogleGenerativeAI(this.getGeminiApiKey());
    }
    return this.geminiInstance;
  }
}

export const llmClientService = new LLMClientService();
