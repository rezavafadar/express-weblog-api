import createQueues from '../../shared/bull/create-queue';
import emailQueues from './emailQueues/index';

const queues = createQueues([...emailQueues]);

export default queues;
