import {
    isEmpty,
    containsIllegalSymbols,
    containsOnlyNumbers
} from '../../ValidationUtils/ValidationUtils'

export function checkName(name, products) {
    if (isEmpty(name)) {
        return 'Не введено наименование продукта';
    }
    else if (containsIllegalSymbols(name)) {
        return 'Содержатся недопустимые символы';
    }
    else if (productExists(products, name)) {
        return 'Товар с таким наименованием уже добавлен';
    }
    else {
        return '';
    }
}

export function checkPrice(price) {
    if (isEmpty(price)) {
        return 'Не указана цена';
    }
    else if (!containsOnlyNumbers(price)) {
        return 'Цена может содержать только цифры';
    }
    else {
        return '';
    }
}

export function checkCount(count) {
    if (isEmpty(count)) {
        return 'Не указано количество';
    }
    else if (!containsOnlyNumbers(count)) {
        return 'Количество может содержать только цифры';
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

export function checkUnit(unit) {
    if (!unit) {
        return 'Не выбрана единица измерения товара';
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