//Начальные данные для слайдера
let downPayment = 200000;       //Первый взнос
let creditTerm = 5;             //Срок кредита
let interestRate = 7;           //Процентная ставка
let apartmentPrice = 1000000;   //Стоимость апартаментов

//Функция рассчета платежа получает 4 аргумента в соответствии с теми переменными, которые мы определили
function printResult(dP, cT, iR, aP) {

    let monthlyPayment; //локальная переменная, в которую мы будем записывать данные по месячному платежу
    let creditAmount; //локальная переменная, в которую мы будем записывать данные по сумме кредита
    let annuityRatio;

    cT = cT * 12; //срок кредита в месяцах
    iR = iR / 100 / 12; //месячная процентная ставка
    annuityRatio =  iR * Math.pow( 1 + iR, cT ) / ( Math.pow( 1 + iR, cT) - 1 ); // рассчет коэффициента аннуитета
    monthlyPayment = annuityRatio * (aP - dP); //рассчет месячного платежа
    creditAmount = monthlyPayment * cT; //рассчет общей суммы кредита
    //обращаемся к форме вывода месячного платежа и помещаем в нее отформатированные данные (с отброшенными десятыми долями и приведенное к денежному формату)
    $('.ipoCalc-monthlyPayment__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(monthlyPayment)) + ' ₽');
    //обращаемся к форме вывода суммы кредита и помещаем в нее отформатированные данные (с отброшенными десятыми долями и приведенное к денежному формату)
    $('.ipoCalc-creditAmount__result').text(new Intl.NumberFormat('ru-RU').format(Math.trunc(creditAmount)) + ' ₽');
}

$('.ipoCalc-slider').each(function () {
    $(this).ionRangeSlider({
      grid: false,
      onChange: function (data) {
        if (this.postfix == ' ₽') downPayment = data.from;
        else if (this.postfix == ' лет') creditTerm = data.from;
        else if (this.postfix == ' %') interestRate = data.from;
        printResult(downPayment, creditTerm, interestRate, apartmentPrice);
      }
    });
  })



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
        apartmentPrice = 2500000;
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