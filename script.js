'use strict'
import {yearsEndCheck} from './yearsEndCheck.js'

let downPayment = $(".downPayment-slider").attr('value');                                       //Первый взнос
let creditTerm = $(".creditTerm-slider").attr('value');                                         //Срок кредита
let interestRate = $(".interestRate-slider").attr('value');                                     //Процентная ставка
let apartmentPrice = $(".ipoCalc-apartments__item").attr('data-price');                         //Стоимость апартаментов

function printResult(dP, cT, iR, aP) { 
    let monthlyPayment;
    let creditAmount;
    let annuityRatio;

    cT = cT * 12;                                                                               //Cрок кредита в месяцах
    iR = iR / 100 / 12;                                                                         //Месячная процентная ставка
    annuityRatio =  iR * Math.pow( 1 + iR, cT ) / ( Math.pow( 1 + iR, cT) - 1 );                //Рассчет коэффициента аннуитета
    monthlyPayment = annuityRatio * (aP - dP);                                                  //Рассчет месячного платежа
    creditAmount = monthlyPayment * cT;                                                         //Рассчет общей суммы кредита
    $('.ipoCalc-monthlyPayment__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(monthlyPayment)) + ' ₽');
    $('.ipoCalc-creditAmount__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(creditAmount)) + ' ₽');
}

$('.ipoCalc-slider').each(function () {
    $(this).ionRangeSlider({
      grid: false,
      onStart: function (data) {
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
      },
      onChange: function (data) {
        if(data.input.hasClass("downPayment-slider")) downPayment = data.from;
        else if(data.input.hasClass("creditTerm-slider")) { 
            $('.ipoCalc-creditTerm__graph').find('.irs-single').text(yearsEndCheck(String(data.from)));
            creditTerm = data.from;
        }
        else if(data.input.hasClass("interestRate-slider")) interestRate = data.from;
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);                     //Функция рассчета платежа
      }
    });
});

$(".ipoCalc-apartments__item").click(function() {
    $(".ipoCalc-apartments__item").removeClass('activeApartment');
    $(this).addClass('activeApartment');
    apartmentPrice = $(this).attr('data-price');
    let downPaymentSlider = $(".downPayment-slider").data("ionRangeSlider"); 
    downPaymentSlider.update({max: apartmentPrice});
    printResult(downPayment, creditTerm, interestRate, apartmentPrice)
});