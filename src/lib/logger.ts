/**
 * Logger Module
 * 
 * Centralized logging with configurable levels and formatting.
 * Can route to console, Sentry, or external logging service.
 */

import { env } from '../config/env';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  context?: Record<string, unknown>;
}

class Logger {
  private logLevel: LogLevel;
  private isDev: boolean;

  constructor() {
    this.logLevel = env.logLevel || 'info';
    this.isDev = env.isDevelopment;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private formatEntry(entry: LogEntry): string {
    const { timestamp, level, message, data } = entry;
    const prefix = `[${timestamp}] ${level.toUpperCase()}`;
    if (data) {
      return `${prefix}: ${message} ${JSON.stringify(data)}`;
    }
    return `${prefix}: ${message}`;
  }

  private getConsoleMethod(level: LogLevel): 'log' | 'warn' | 'error' {
    switch (level) {
      case 'error':
        return 'error';
      case 'warn':
        return 'warn';
      case 'debug':
      case 'info':
      default:
        return 'log';
    }
  }

  debug(message: string, data?: unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog('debug')) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'debug',
      message,
      data,
      context,
    };

    if (this.isDev) {
      console[this.getConsoleMethod('debug')](this.formatEntry(entry));
    }
  }

  info(message: string, data?: unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog('info')) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      data,
      context,
    };

    console[this.getConsoleMethod('info')](this.formatEntry(entry));
  }

  warn(message: string, data?: unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog('warn')) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      data,
      context,
    };

    console[this.getConsoleMethod('warn')](this.formatEntry(entry));
  }

  error(message: string, data?: unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog('error')) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      data,
      context,
    };

    console[this.getConsoleMethod('error')](this.formatEntry(entry));
  }
}

export const log = new Logger();
