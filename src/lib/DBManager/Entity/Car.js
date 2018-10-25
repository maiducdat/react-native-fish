import Realm from 'realm';
import RealmKeys from '../../../constants/RealmKeys';
/**********************************************************************************************************************/

export default class Car extends Realm.Object {
    get getName() {
        return this.name
    }
}

Car.schema = {
    name: RealmKeys.TABLE_NAME_CAR,
    properties: {
        name: 'string'
    }
};
