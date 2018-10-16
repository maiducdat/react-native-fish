import { AsyncStorage } from "react-native";
import StorageKeys from "../../constants/StorageKeys";
/**********************************************************************************************************************/

module.exports = {
    Keys: StorageKeys,
    async saveString(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            return true
        } catch {
            return false
        }
    },
    async loadString(key) {
        try {
            return await AsyncStorage.getItem(key)
        } catch {
            return null
        }
    },
    async save(key, value) {
        try {
            if (typeof value === "object") {
                await AsyncStorage.setItem(key, JSON.stringify(value))
            } else {
                await AsyncStorage.setItem(key, value)
            }
            return true
        } catch {
            return false
        }
    },
    async load(key) {
        try {
            const almostThere = await AsyncStorage.getItem(key);
            return JSON.parse(almostThere)
        } catch {
            return null
        }
    },
    async remove(key) {
        try {
            await AsyncStorage.removeItem(key)
        } catch {}
    },
    async clear() {
        try {
            await AsyncStorage.clear()
        } catch {}
    }
};
