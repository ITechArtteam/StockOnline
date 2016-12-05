import {
    isEmpty,
    containsIllegalSymbols
} from '../../ValidationUtils/ValidationUtils'

export function checkCarNumber(number) {
    if (isEmpty(number)) {
        return 'Значение номера пусто';
    }
    else if (containsIllegalSymbols(number)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkTrailerNumber(number) {
    if (containsIllegalSymbols(number)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}