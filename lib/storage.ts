import * as SecureStore from "expo-secure-store";

class Storage {
  private static _instance: Storage | undefined = undefined;

  private constructor() {}

  public static getInstance(): Storage {
    if (!Storage._instance) {
      Storage._instance = new Storage();
    }
    return Storage._instance;
  }

  public async saveItemAsync(key: string, value: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      console.error(`Error saving item with key "${key}":`, error);
      return false;
    }
  }

  public async getItemAsync(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Error getting item with key "${key}":`, error);
      return null;
    }
  }

  public async deleteItemAsync(
    key: string
  ): Promise<{ key: string; value: string | null }> {
    try {
      const value = await this.getItem(key);
      await SecureStore.deleteItemAsync(key);
      return { key, value };
    } catch (error) {
      console.error(`Error deleting item with key "${key}":`, error);
      return { key, value: null };
    }
  }

  public saveItem(key: string, value: string): boolean {
    try {
      SecureStore.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error saving item with key "${key}":`, error);
      return false;
    }
  }

  public getItem(key: string): string | null {
    try {
      return SecureStore.getItem(key);
    } catch (error) {
      console.error(`Error getting item with key "${key}":`, error);
      return null;
    }
  }

  public deleteItem(key: string): { key: string; value: string | null } {
    try {
      const value = this.getItem(key);
      SecureStore.deleteItemAsync(key);
      return { key, value };
    } catch (error) {
      console.error(`Error deleting item with key "${key}":`, error);
      return { key, value: null };
    }
  }
}

export default Storage;
