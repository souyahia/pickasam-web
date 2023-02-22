import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const POP_OUT_ANIMATION_DURATION_MS = 200;

export enum PopOutState {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

export const popOutAnimation = trigger('popOut', [
  state(
    PopOutState.HIDDEN,
    style({
      visibility: 'hidden',
    }),
  ),
  state(
    PopOutState.VISIBLE,
    style({
      visibility: 'visible',
    }),
  ),
  transition(`${PopOutState.HIDDEN} => ${PopOutState.VISIBLE}`, [
    animate(
      `${POP_OUT_ANIMATION_DURATION_MS}ms`,
      keyframes([
        style({ transform: 'scale(0)', visibility: 'visible', offset: 0 }),
        style({ transform: 'scale(1.2)', offset: 0.6 }),
        style({ transform: 'scale(1)', offset: 1 }),
      ]),
    ),
  ]),
]);
