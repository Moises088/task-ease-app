import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageCls {
    public async get<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting data from AsyncStorage:', error);
            return null;
        }
    }

    public async save<T>(key: string, data: T): Promise<boolean> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
            return false;
        }
    }

    public async update<T>(key: string, newData: T): Promise<T | null> {
        try {
            const existingData = await this.get(key);
            if (existingData !== null) {
                const updatedData = { ...existingData, ...newData };
                await AsyncStorage.setItem(key, JSON.stringify(updatedData));
                return updatedData;
            } else {
                console.error(`Data with key '${key}' not found in AsyncStorage.`);
                return null;
            }
        } catch (error) {
            console.error('Error updating data in AsyncStorage:', error);
            return null;
        }
    }

    public async delete(key: string): Promise<boolean> {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error deleting data from AsyncStorage:', error);
            return false;
        }
    }

    public async clear(): Promise<boolean> {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
            return false;
        }
    }
}

export const Storage = new StorageCls()