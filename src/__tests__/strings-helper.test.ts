import { formatTime } from '@helpers/strings-helper';

test('It should return time in AM/PM format', () => {
  const time = new Date(1995, 11, 17, 3, 24, 0).getTime();
  expect(formatTime(time, true)).toBe('3:24 AM');
});

test('It should return time in 24H format', () => {
  const time = new Date(1995, 11, 17, 15, 24, 0).getTime();
  expect(formatTime(time, false)).toBe('15:24');
});

test('It should return minutes below 10 with two digits', () => {
  const time = new Date(1995, 11, 17, 3, 2, 0).getTime();
  expect(formatTime(time, true)).toBe('3:02 AM');
  expect(formatTime(time, false)).toBe('3:02');
});
