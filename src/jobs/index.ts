import queues from './queues';
import type { ICreatedQueue } from '../interfaces/queues.interfaces';

export class Jobs {
  private processStarted: boolean;
  private queues: ICreatedQueue[];
  constructor() {
    this.processStarted = false;
    this.queues = queues;
  }

  addJob(name: string, data: any) {
    if (!this.processStarted)
      throw new Error(
        'Jobs Process not started! please start process before add job.',
      );

    const queue = this.queues.find((queue) => queue.bull.name === name);
    queue.bull.add(data);
  }

  startProcess() {
    console.log('Starting Process Jobs...');

    this.queues.map((queue) => {
      queue.bull.process(queue.handler);
    });
    this.processStarted = true;

    console.log('Jobs Process Started.');
  }
}

export default new Jobs();
