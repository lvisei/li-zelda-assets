class Store {
  private storeKey = '__L7_ZELDA_ARCHEIVE_STORE__';

  private pool = new Map<string, any>();

  constructor() {
    this.restore();
  }

  private restore() {
    const storedData = localStorage.getItem(this.storeKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData === 'object') {
          this.pool = new Map<string, any>(Object.entries(parsedData));
        }
      } catch (error) {
        // Failed to restore data from localStorage
      }
    }
  }

  private store() {
    try {
      const serializedData = JSON.stringify(Object.fromEntries(this.pool));
      localStorage.setItem(this.storeKey, serializedData);
    } catch (error) {
      console.error('Failed to store data in localStorage:', error);
    }
  }

  public setItem(key: string, value: Record<string, any>) {
    this.pool.set(key, value);
    this.store();
  }

  public getItem(key: string) {
    return this.pool.get(key);
  }
}

export const store = new Store();

export function setAchieved(markId: string, status: boolean) {
  const record = store.getItem(markId) || {};
  store.setItem(markId, { ...record, archieve: status });
}

export function achieved(markId: string) {
  setAchieved(markId, true);
}

export function unAchieved(markId: string) {
  setAchieved(markId, false);
}

export function isAchieved(markId: string) {
  const record = store.getItem(markId) || {};
  return !!record?.archieve;
}
