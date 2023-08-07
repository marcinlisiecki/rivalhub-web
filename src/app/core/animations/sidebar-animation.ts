import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const navAnimation = trigger('openSidebar', [
  state('false', style({ right: '0' })),
  state('true', style({ right: '320px' })),
  // ...
  transition('false <=> true', [animate('100ms')]),
]);
