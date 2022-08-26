//Начальные данные для слайдера
let downPayment = 200000;       //Первый взнос
let creditTerm = 5;             //Срок кредита
let interestRate = 7;           //Процентная ставка
let apartmentPrice = 1000000;   //Стоимость апартаментов

//Функция рассчета платежа получает 4 аргумента в соответствии с теми переменными, которые мы определили
function printResult(dP, cT, iR, aP) {
    console.log(dP, cT, iR, aP)
    let monthlyPayment = 0; //локальная переменная, в которую мы будем записывать данные по месячному платежу
    let creditAmount = 0; //локальная переменная, в которую мы будем записывать данные по сумме кредита
    monthlyPayment = ( (aP - dP) / cT * (iR / 100 + 1) ) / 12; //условный рассчет месячного платежа
    creditAmount = (aP - dP) * (((iR / 100) * cT) + 1); //условный рассчет суммы по кредиту
    //обращаемся к форме вывода месячного платежа и помещаем в нее отформатированные данные (с отброшенными десятыми долями и приведенное к денежному формату)
    $('.ipoCalc-monthlyPayment__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(monthlyPayment)) + ' ₽');
    //обращаемся к форме вывода суммы кредита и помещаем в нее отформатированные данные (с отброшенными десятыми долями и приведенное к денежному формату)
    $('.ipoCalc-creditAmount__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(creditAmount)) + ' ₽');
}

//Слайдер первоначального взноса
$(".downPayment-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: apartmentPrice,
    from: downPayment,
    grid: false,
    postfix: " ₽",
    //добавляем прослушку изменения позиции слайдера
    onChange: function (data) {
        downPayment = data.from; //при сдвиге слайдера обновляем глобальную переменную с первоначальным взносом
        //при сдвиге слайдера запускаем функцию вычисления и передаем необходимы аргументы
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
    }
});

//Слайдер срока кредитования
$(".creditTerm-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: 40,
    from: creditTerm,
    from_min: 1,
    grid: false,
    postfix: " лет",
    onChange: function (data) {
        creditTerm = data.from; //при сдвиге слайдера обновляем глобальную переменную со сроком кредитования
        //при сдвиге слайдера запускаем функцию вычисления и передаем необходимы аргументы
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
    }
});

//Слайдер процентной ставки
$(".interestRate-slider").ionRangeSlider({
    type: "single",
    min: 0,
    max: 40,
    from: interestRate,
    grid: false,
    postfix: " %",
    onChange: function (data) {
        interestRate = data.from; //при сдвиге слайдера обновляем глобальную переменную с процентной ставкой
        //при сдвиге слайдера запускаем функцию вычисления и передаем необходимы аргументы
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
    }
});


//создаем переменную для доступа к параметрам слайдера
let downPaymentSlider = $(".downPayment-slider").data("ionRangeSlider"); 
//включаем прослушку клика по вкладкам с апартаментами (студия\1-ком\2-ком\3-ком)
$(".ipoCalc-apartments__item").click(function() {
    //при клике по любой из квартир удаляем класс, выделяющий красным у всех
    $(".ipoCalc-apartments__item").removeClass('activeApartment');
    //и добавляем класс выделения на тот, по которому произошел клик
    $(this).addClass('activeApartment');
    //если кликнули по студии, то устанавливаем переменную с ценой апартаментов на 1 000 000,
    //а так же обновляем данные первого слайдера о максимальной сумме первоначального взноса
    if ($(this).hasClass('studio')) {
        apartmentPrice = 1000000;
        downPaymentSlider.update({max: apartmentPrice});
    }
    //аналогично с однокомнатной
    else if ($(this).hasClass('one-room')) {
        apartmentPrice = 2000000;
        downPaymentSlider.update({max: apartmentPrice});
    }
    //аналогично с двухкомнатной
    else if ($(this).hasClass('two-room')) {
        apartmentPrice = 4000000;
        downPaymentSlider.update({max: apartmentPrice});
    }
    //аналогично с трехкомнатной
    else if ($(this).hasClass('three-room')) {
        apartmentPrice = 6000000;
        downPaymentSlider.update({max: apartmentPrice});
    }
    //отрисовываем изменения после каждого перехода по вкладкам
    printResult(downPayment, creditTerm, interestRate, apartmentPrice)
})