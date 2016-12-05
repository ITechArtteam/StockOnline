import { isEmpty } from '../../../ValidationUtils/ValidationUtils'

export function checkNumber(number, numbers) {
    if (isEmpty(number)) {
        return 'Значение номера пусто';
    }
    else if (numbers && numberExists(numbers, number)) {
        return 'Номер уже добавлен';
    }
    else {
        return '';
    }
}

export function numberExists(numbers, number) {
    return numbers.filter(function(tempNumber) {
        return tempNumber.number == number;
    }).length > 0;
}