import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const navBtnAnimation = trigger('openSidebar', [
  state('false', style({ right: '5px' })),
  state('true', style({ right: '325px' })),
  transition('false <=> true', [animate('100ms')]),
]);

export const navBtnAnimationMobile = trigger('sidebarMobile', [
  state('false', style({ top: '*' })),
  state('true', style({ top: '25px' })),
  transition('false <=> true', [animate('100ms')]),
]);
