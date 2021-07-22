export function documentReady(callback: Function): void {
  const { document } = window;
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', () => callback(document));
  }
  return callback(document);
}
