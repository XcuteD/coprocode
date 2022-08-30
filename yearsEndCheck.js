'use strict'

export function yearsEndCheck(years, i = 1) {
    if ( 10 <= years && years <= 20 ) return years + ' лет'
    else {
        switch (years[i]) {
            case '1':
                return years + ' год';
                break;
            case '2':
            case '3':
            case '4':
                return years + ' года';
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                return years + ' лет';
                break;
            case undefined:
                return yearsEndCheck(years, 0);
                break;
        }
    }
}