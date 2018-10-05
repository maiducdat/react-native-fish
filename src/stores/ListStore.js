import {observable, computed, action} from 'mobx';
import DBManager from "../lib/DBManager";
/**********************************************************************************************************************/

export default class ListStore {
    @observable list = [];

    constructor() {
    }

    @action loadOldList() {
        this.list = DBManager.getListPerson();
    }

    @action setList(list) {
        this.list = list;
    }

    @computed get computedList() {
        return this.list;
    }

    @action addPerson (item) {
        DBManager.addPerson(item, ()=>{
            this.loadOldList();
        });
    }

    @action removePerson (person) {
        DBManager.removePerson(person);
        this.loadOldList();
    }

    @action addCar(person, name) {
        DBManager.addCar(person, name, ()=>{
            this.loadOldList();
        });
    }
}
