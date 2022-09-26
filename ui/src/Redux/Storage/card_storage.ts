export function loadState(KEY: string) {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: string, KEY: string) {
  try {
    localStorage.setItem(KEY, state);
  } catch (e) {
    // Ignore
  }
}
