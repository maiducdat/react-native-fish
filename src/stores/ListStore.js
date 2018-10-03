import {observable, computed, action} from 'mobx';
import { AsyncStorage } from 'react-native';

let index = 0;

export default class ListStore {
    @observable list = [{
        name: "fish123",
        items: [],
        index: 1
    }];

    @action setList(list) {
        this.list = list;
    }

    @computed get computedList() {
        return this.list;
    }

    @action addListItem (item) {
        this.list.push({
            name: item,
            items: [],
            index
        });
        index++
    }

    @action removeListItem (item) {
        this.list = this.list.filter((l) => {
            return l.index !== item.index
        })
    }

    @action addItem(item, name) {
        this.list.forEach((l) => {
            if (l.index === item.index) {
                l.items.push(name)
            }
        })
    }
}
