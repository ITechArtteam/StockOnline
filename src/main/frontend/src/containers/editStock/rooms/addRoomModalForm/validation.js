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
    else if (roomExists(shelfs, number)) {
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


function roomExists(rooms, number) {
    return rooms.filter(function(room) {
        return room.number == number;
    }).length > 0;
}