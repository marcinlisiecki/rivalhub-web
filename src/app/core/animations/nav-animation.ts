import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const navAnimation = trigger('openNav', [
  state(
    'false',
    style({
      height: '*',
      opacity: '*',
    }),
  ),
  state(
    'true',
    style({
      height: '0px',
      opacity: 0,
    }),
  ),
  // ...
  transition('false => true', [
    animate(
      '500ms',
      keyframes([
        style({ opacity: 1, height: '*' }),
        style({ opacity: 0.5 }),
        style({ opacity: 0.1 }),
        style({ opacity: 0, height: '0px' }),
      ]),
    ),
  ]),
  transition('true => false', [
    animate(
      '500ms',
      keyframes([
        style({ opacity: 0, height: '0px' }),
        style({ height: '80px' }),
        style({ height: '160px' }),
        style({ opacity: '*', height: '*' }),
      ]),
    ),
  ]),
]);
