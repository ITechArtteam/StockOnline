import {
    isEmpty
} from '../../ValidationUtils/ValidationUtils'

export function checkName(name, products) {
    if (isEmpty(name)) {
        return 'Не введено название продукта';
    }
    else if (productExists(products, name)) {
        return 'Товар с таким названием уже добавлен';
    }
    else {
        return '';
    }
}

export function checkPrice(price) {
    if (isEmpty(price)) {
        return 'Не указана цена';
    }
    else {
        return '';
    }
}

export function checkCount(count) {
    if (isEmpty(count)) {
        return 'Не указано количество';
    }
    else {
        return '';
    }
}

export function checkStorage(storage) {
    if (isEmpty(storage)) {
        return 'Не указан способ хранения';
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