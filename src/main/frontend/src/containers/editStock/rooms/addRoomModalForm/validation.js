import {
    isEmpty,
    containsIllegalSymbols,
    containsOnlyNumbers
} from '../../ValidationUtils/ValidationUtils'

export function checkNumber(number, rooms) {
    if (isEmpty(number)) {
        return 'Не введен номер помещения';
    }
    else if (containsIllegalSymbols(name)) {
        return 'Содержатся недопустимые символы';
    }
    else if (number.length > 6) {
        return 'Помещение не более 6 символов';
    }
    else if (roomExists(rooms, number)) {
            return 'Помещение с таким номером уже добавлено';
        }
        else {
            return '';
        }
}

export function checkShelfNumber(number, shelfs) {
    if (isEmpty(number)) {
        return 'Не введен номер места хранения';
    }
    else if (containsIllegalSymbols(name)) {
        return 'Содержатся недопустимые символы';
    }
    else if (number.length > 6) {
        return 'Место хранения не более 6 символов';
    }
    else if (shelfExists(shelfs, number)) {
        return 'Место хранение с таким номером уже добавлено';
    }
    else {
        return '';
    }
}

export function checkCost(cost) {
    if (isEmpty(cost)) {
        return 'Не указана стоимость хранения';
    }
    else if (!containsOnlyNumbers(cost)) {
        return 'Стоимость хранения может содержать только цифры';
    }
    else {
        return '';
    }
}

export function checkShelfCapacity(capacity) {
    if (isEmpty(capacity)) {
        return 'Не указана вместимость';
    }
    else if (!containsOnlyNumbers(capacity)) {
        return 'Вместимость может содержать только цифры';
    }
    else {
        return '';
    }
}


export function checkStorage(storage) {
    if (isEmpty(storage)) {
        return 'Не указан способ хранения';
    }
    else if (containsIllegalSymbols(storage)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

function shelfExists(shelfs, number) {
    if(!!shelfs){
        return shelfs.filter(function(shelf) {
                return shelf.number == number;
            }).length > 0;
    }else{
        return false;
    }

}

function roomExists(rooms, number) {
    if(!!rooms){
        return rooms.filter(function(room) {
                return room.number == number;
            }).length > 0;
    }else{
        return false;
    }
}