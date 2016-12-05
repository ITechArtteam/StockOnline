export function checkDescription(description) {
    if (description.length < 1) {
        return 'Дополнительное описание товарной партии дожно содержать не менее одного символа';
    }
    else {
        return '';
    }
}

export function checkWaybillNumber(number) {
    return 'number-error';
}

export function checkSenderName(name) {
    return 'sender-name-error';
}

export function checkIssuanceDate(date) {
    return 'issuance-date-error';
}