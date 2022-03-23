import Bull, { QueueOptions } from 'bull';
import type { ICreatedQueue, IQueue } from '../../interfaces/queues.interfaces';

const createQueues = (
  queue: IQueue[],
  options?: QueueOptions,
): ICreatedQueue[] =>
  queue.map((queue) => {
    const jobQueue = new Bull(queue.name, {
      defaultJobOptions: {
        removeOnComplete: true,
      },
      ...options,
    });
    return { bull: jobQueue, handler: queue.handler.bind(queue) };
  });

export default createQueues;
