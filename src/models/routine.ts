import { Exercise } from './exercise';

export class Routine {
  constructor(public name: string,
              public exercise: Exercise[]) {}
}
