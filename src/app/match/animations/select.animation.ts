import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const SELECT_ANIMATION_DURATION_MS = 200;

export enum SelectState {
  DEFAULT = 'default',
  SELECTED = 'selected',
  NOT_SELECTED = 'not-selected',
}

export const selectAnimation = trigger('select', [
  state(SelectState.DEFAULT, style({})),
  state(SelectState.SELECTED, style({})),
  state(SelectState.NOT_SELECTED, style({})),
  transition(`${SelectState.DEFAULT} => ${SelectState.SELECTED}`, [
    animate(
      `${SELECT_ANIMATION_DURATION_MS}ms`,
      keyframes([
        style({ transform: 'scale(1)', backgroundColor: '#F6386B', offset: 0 }),
        style({ transform: 'scale(1.2)', offset: 0.4 }),
        style({ transform: 'scale(0)', offset: 1 }),
      ]),
    ),
  ]),
  transition(`${SelectState.DEFAULT} => ${SelectState.NOT_SELECTED}`, [
    animate(
      `${SELECT_ANIMATION_DURATION_MS}ms`,
      keyframes([
        style({ transform: 'scale(1)', filter: 'grayscale(1)', offset: 0 }),
        style({ transform: 'scale(1)', offset: 0.4 }),
        style({ transform: 'scale(0)', offset: 1 }),
      ]),
    ),
  ]),
]);
