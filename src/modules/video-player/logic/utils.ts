/**
 * Transform seconds to text giving 08:05 for the example.
 *
 * @param {number} seconds The number of seconds to transform.
 *
 * @returns {string}
 */
export function secondsToMS(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}
