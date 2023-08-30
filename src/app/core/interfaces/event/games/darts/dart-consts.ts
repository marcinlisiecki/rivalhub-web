import { DartFormat } from './dart-format';
import { DartMode } from './dart-mode';

export const DARTSMODES = [
  { label: '---', value: DartMode.None },
  { label: 'Double In', value: DartMode.DoubleIn },
  { label: 'Double Out', value: DartMode.DoubleOut },
  { label: 'Double In and Out', value: DartMode.DoubleInAndOut },
];

export const DARTSFORMATS = [
  { label: '301', value: DartFormat._301 },
  { label: '501', value: DartFormat._501 },
  { label: '701', value: DartFormat._701 },
  { label: '901', value: DartFormat._901 },
];
