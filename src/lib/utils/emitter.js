import { EventEmitter } from 'events';

class Emitter extends EventEmitter {}

const emitter = new Emitter();

emitter.setMaxListeners(0);

export default emitter;
