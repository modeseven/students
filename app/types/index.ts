export interface ExecutionConfig {
  iterations: number;
  delayBetweenExecutions: number;
  stopOnError: boolean;
  executionMode: 'sequential' | 'parallel' | 'batch';
  batchSize: number;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}
