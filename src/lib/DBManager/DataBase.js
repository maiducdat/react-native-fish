import Realm from "realm";
import RNSecureKeyStore from "react-native-secure-key-store";
import RealmKeys from 'constants/RealmKeys';
import Entity from './Entity';
/**********************************************************************************************************************/
let instance = null;
export default class Database {
    constructor(callback) {
        if (!instance) {
            instance = this;
            this.initDB(callback);
        } else {
            if (callback && typeof(callback) == 'function') {
                callback();
            }
        }
        return instance;
    }

    //Init db
    initDB(callback) {
        let _this = this;
        this.isSettingDbKey = false;
        if(!this.DBSecureKey) {
            this.getDbKey((DBSecureKey)=>{
                _this.DBSecureKey = DBSecureKey;
                Realm.open({
                    schema: [...Entity],
                    encryptionKey: this.getKeyCodeFromString(DBSecureKey)
                }).then(realm => {
                    _this.realm = realm;
                    if (callback && typeof(callback) == 'function') {
                        callback();
                    }
                });
            });
        } else {
            Realm.open({
                schema: [...Entity],
                encryptionKey: this.getKeyCodeFromString(this.DBSecureKey)
            }).then(realm => {
                _this.realm = realm;
                if (callback && typeof(callback) == 'function') {
                    callback();
                }
            });
        }
    }

    makeRandomKey() {
        let keyString = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 64; i++) {
            keyString += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return keyString;
    }

    getDbKey(callback) {
        let _this = this;
        let doCallback = ()=>{
            if (callback && typeof(callback) == 'function') {
                callback(_this.DBSecureKey);
            } else {
                console.log("callback is not define or is not a function");
            }
        };
        if(this.DBSecureKey) {
            doCallback();
            return;
        }
        if(this.isSettingDbKey) {
            let intervalId = setInterval(function () {
                console.log("wait interval");
                if(_this.DBSecureKey) {
                    clearInterval(intervalId);
                    doCallback();
                }
            }, 100);
        } else {
            this.isSettingDbKey = true;
            RNSecureKeyStore.get(RealmKeys.KEY_SECURE_STORE)
                .then((res) => {
                    _this.DBSecureKey = res;
                    doCallback();
                }, (err) => {
                    let newDBKey = _this.makeRandomKey();
                    RNSecureKeyStore.set(RealmKeys.KEY_SECURE_STORE, newDBKey)
                        .then((res) => {
                            _this.DBSecureKey = newDBKey;
                            doCallback();
                        }, (err) => {
                            _this.DBSecureKey = newDBKey;
                            doCallback();
                        });
                });
        }
    }

    getKeyCodeFromString(keyString) {
        let DBSecureKey = new Int8Array(64);
        for(let i=0; i<64; i++) {
            DBSecureKey[i] = keyString.charCodeAt(i);
        }

        let tmpString = "";
        for(let i=0; i<64; i++) {
            tmpString += (keyString.charCodeAt(i)).toString(16);
        }
        return DBSecureKey;
    }

    getListPerson() {
        let resultList = this.realm.objects(RealmKeys.TABLE_NAME_PERSON);
        resultList = Array.from(resultList);
        if(resultList && resultList.length > 0) {
            resultList = JSON.parse(JSON.stringify(resultList));
            resultList.map((person)=>{
                person.cars =Object.keys(person.cars).map(function(key) {
                    return person.cars[key];
                });
            });
            return resultList;
        }
        return [];
    }

    addPerson(name, callback) {
        try {
            let object = null;
            let id = this.realm.objects(RealmKeys.TABLE_NAME_PERSON).length + 1;
            this.realm.write(()=> {
                object = this.realm.create(RealmKeys.TABLE_NAME_PERSON, {id, name, cars: []});
                if (callback && typeof(callback) == 'function') {
                    callback();
                }
            });
            return object;
        } catch (e) {
            if (callback && typeof(callback) == 'function') {
                callback();
            }
            return null;
        }
    }

    removePerson(person) {
        try {
            let _this = this;
            this.realm.write(()=> {
                let object = _this.realm.objects(RealmKeys.TABLE_NAME_PERSON).filtered('id = \"' + person.id + '\"');
                this.realm.delete(object);
            });
            return true;
        } catch (e) {
            return null;
        }
    }

    addCar(person, name, callback) {
        try {
            let _this = this;
            this.realm.write(()=> {
                let object = _this.realm.objects(RealmKeys.TABLE_NAME_PERSON).filtered('id = \"' + person.id + '\"');
                if(object && object.length>0) {
                    object[0].cars.push({name});
                }
                if (callback && typeof(callback) == 'function') {
                    callback();
                }
            });
            return true;
        } catch (e) {
            if (callback && typeof(callback) == 'function') {
                callback();
            }
            return null;
        }
    }

}
