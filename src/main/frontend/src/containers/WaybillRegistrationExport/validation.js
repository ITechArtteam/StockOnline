import {
    isEmpty,
    containsIllegalSymbols,
    containsOnlyNumbers
} from './ValidationUtils/ValidationUtils'

export function checkDescription(description) {
    if (containsIllegalSymbols(description)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkWaybillNumber(number) {
    if (isEmpty(number)) {
        return 'Не указан номер накладной';
    }
    else if (containsIllegalSymbols(number)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkSenderName(name) {
    if (isEmpty(name)) {
        return 'Не указано имя получателя';
    }
    else if (containsIllegalSymbols(name)) {
        return 'Содержатся недопустимые символы';
    }
    else {
        return '';
    }
}

export function checkIssuanceDate(date) {
    if (!date) {
        return 'Не указана дата выписки накладной';
    }
    else {
        let issuanceDate = new Date(date);
        issuanceDate = new Date(issuanceDate.getYear(), issuanceDate.getDate(),
            issuanceDate.getMonth());
        let today = new Date();
        today = new Date(today.getYear(), today.getDate(), today.getMonth());

        if (issuanceDate.getTime() > today.getTime()) {
            return 'Указана некорректная дата выписки накладной';
        }
        else {
            return ''
        }
    }
}

export function checkSender(sender) {
    if (!sender) {
        return 'Не выбран отправитель';
    }
    else {
        return '';
    }
}

export function checkCarrier(carrier) {
    if (!carrier) {
        return 'Не выбран перевозчик';
    }
    else {
        return '';
    }
}

export function checkDriver(driver, transportType) {
    if ((transportType === 'CAR') && !driver) {
        return 'Не выбран водитель';
    }
    else {
        return '';
    }
}

export function checkNumbers(numbers) {
    if (numbers.length < 1) {
        return 'Не указан ни один номер';
    }
    else {
        return '';
    }
}

export function checkCarNumber(number) {
    if (isEmpty(number)) {
        return 'Не указан номер автомобиля';
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

export function checkProducts(products) {
    if (products.length < 1) {
        return 'Не указан ни один товар';
    }
    else {
        return '';
    }
}

export function checkTransportType(type) {
    if (!type) {
        return 'Не указан тип транспорта';
    }
    else {
        return '';
    }
}