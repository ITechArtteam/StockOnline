const DIGITS = '0123456789';
const ILLEGAL_SYMBOLS = ';"\'$!\'';

export function isEmpty(value) {
    return !(value && (value.length > 0));
}

export function containsIllegalSymbols(value) {
    return containsSymbols(value, ILLEGAL_SYMBOLS);
}

export function containsOnlyNumbers(value) {
    return containsOnlyCharsIgnoreCase(value, DIGITS);
}

function containsOnlyCharsIgnoreCase(value, chars) {
    var lowerCaseChars = chars.toLowerCase();
    var lowerCaseValue = value.toLowerCase();
    for (var i = 0; i < value.length; i++) {
        if (lowerCaseChars.indexOf(lowerCaseValue.charAt(i)) == -1) {
            return false;
        }
    }
    return true;
}

function containsSymbols(value, chars) {
    var lowerCaseChars = chars.toLowerCase();
    var lowerCaseValue = value.toLowerCase();
    for (var i = 0; i < value.length; i++) {
        if (lowerCaseChars.indexOf(lowerCaseValue.charAt(i)) != -1) {
            return true;
        }
    }
    return false;
}