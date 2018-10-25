import Realm from 'realm';
import RealmKeys from '../../../constants/RealmKeys';
/**********************************************************************************************************************/

export default class Person extends Realm.Object {
    get getName() {
        return this.name
    }
    get getCars() {
        return this.cars
    }
}

Person.schema = {
    name: RealmKeys.TABLE_NAME_PERSON,
    primaryKey: 'id',
    properties: {
        id:    'int',
        name: 'string',
        cars: RealmKeys.TABLE_NAME_CAR + '[]'
    }
};
