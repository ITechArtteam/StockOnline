import {
    isEmpty,
    containsIllegalSymbols,
    containsOnlyNumbers
} from '../ValidationUtils/ValidationUtils'

export function checkName(name, senders) {
    if (isEmpty(name)) {
        return 'Не введено наименование продукта';
    }
    else if (containsIllegalSymbols(name)) {
        return 'Содержатся недопустимые символы';
    }
    else if (productExists(senders, name)) {
        return 'Такая компания уже зарегистрирована';
    }
    else {
        return '';
    }
}

export function checkState(state) {
    if (containsIllegalSymbols(state)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkCity(city) {
    if (containsIllegalSymbols(city)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkStreet(street) {
    if (containsIllegalSymbols(street)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkHouse(house) {
    if (!containsOnlyNumbers(house)) {
        return 'Номер дома может содержать только цифры'
    }
    else {
        return '';
    }
}

export function checkFlat(flat) {
    if (!containsOnlyNumbers(flat)) {
        return 'Номер квартиры может содержать только цифры'
    }
    else {
        return '';
    }
}

function productExists(products, name) {
    return products.filter(function(product) {
        return product.name == name;
    }).length > 0;
}