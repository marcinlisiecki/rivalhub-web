import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const headerCompactAnimation = trigger('compactHeader', [
  state('false', style({ height: '140px' })),
  state('true', style({ height: '70px' })),
  transition('false <=> true', [animate('50ms')]),
]);
