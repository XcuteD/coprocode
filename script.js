let downPayment = 200000;
let creditTerm = 5;
let interestRate = 7;
let apartmentPrice = 1000000;

function printResult(dP, cT, iR, aP) {
    console.log(dP, cT, iR, aP)
    let monthlyPayment = 0;
    let creditAmount = 0;
    monthlyPayment = ( (aP - dP) / cT * (iR / 100 + 1) ) / 12;
    creditAmount = (aP - dP) * (((iR / 100) * cT) + 1);
    $('.ipoCalc-monthlyPayment__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(monthlyPayment)) + ' ₽');
    $('.ipoCalc-creditAmount__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(creditAmount)) + ' ₽');
}


$(".downPayment-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: apartmentPrice,
    from: downPayment,
    grid: false,
    postfix: " ₽",

    onChange: function (data) {
        downPayment = data.from;
        apartmentPrice = data.max;
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
    }
});
let downPaymentMax = $(".downPayment-slider").data("ionRangeSlider");

$(".creditTerm-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: 40,
    from: creditTerm,
    from_min: 1,
    grid: false,
    postfix: " лет",

    onChange: function (data) {
        creditTerm = data.from;
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
    }
});

$(".interestRate-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: 40,
    from: interestRate,
    grid: false,
    postfix: " %",

    onChange: function (data) {
        interestRate = data.from;
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
    }
});


$(".ipoCalc-apartments__item").click(function() {
    $(".ipoCalc-apartments__item").removeClass('activeApartment');
    $(this).addClass('activeApartment');
    if ($(this).hasClass('studio')) {
        apartmentPrice = 1000000;
        downPaymentMax.update({max: apartmentPrice});
    }
    else if ($(this).hasClass('one-room')) {
        apartmentPrice = 2000000;
        downPaymentMax.update({max: apartmentPrice});
    }
    else if ($(this).hasClass('two-room')) {
        apartmentPrice = 4000000;
        downPaymentMax.update({max: apartmentPrice});
    }
    else if ($(this).hasClass('three-room')) {
        apartmentPrice = 6000000;
        downPaymentMax.update({max: apartmentPrice});
    }
    printResult(downPayment, creditTerm, interestRate, apartmentPrice)
})