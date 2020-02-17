
document.addEventListener('DOMContentLoaded', function () {
    /// -----Переменные-----
    // значения из инпутов
    const totalCost = document.getElementById('total-cost');
    const initialFee = document.getElementById('an-initial-fee');
    const creditTerm = document.getElementById('credit-term');
    // значения из range-инпутов
    const totalCostRange = document.getElementById('total-cost-range');
    const initialFeeRange = document.getElementById('an-initial-fee-range');
    const creditTermRange = document.getElementById('credit-term-range');
    // итоговые значения
    const amountOfCredit = document.getElementById('amount-of-credit');
    const monthlyPayment = document.getElementById('monthly-payment');
    const recommendedIncome = document.getElementById('recommended-income');

    const allRange = document.querySelectorAll('.input-range');
    const allBanks = document.querySelectorAll('.bank'); // псевдомасив

    /// объединение инпута и range
    const assignValue = () => {
        totalCost.value = totalCostRange.value;
        initialFee.value = initialFeeRange.value;
        creditTerm.value = creditTermRange.value;
    }
    assignValue();

    const banks = [
        {
            name: 'alfa',
            procent: 8.7
        },
        {
            name: 'sberbank',
            procent: 8.4
        },
        {
            name: 'pochta',
            procent: 7.9
        },
        {
            name: 'tinkoff',
            procent: 9.2
        }
    ]

    let currentProcent = banks[0].procent;

    for (let bank of allBanks)
    {
        bank.addEventListener('click', () => {
            for (let bank of allBanks) {
                bank.classList.remove('active');
                calculate(totalCost.value, initialFee.value, creditTerm.value );
            }
            bank.classList.add('active');
            takeActiveBank(bank);
        })
    }
    const takeActiveBank = currentActive => {
       const dataAttrValue = currentActive.dataset.name; 
        const currentBank = banks.find(bank => bank.name === dataAttrValue);
        currentProcent = currentBank.procent;
    };

    for (let range of allRange) {
        range.addEventListener('input', () => {
            assignValue();
            calculate(totalCost.value, initialFee.value, creditTerm.value );
        })
    }

    const calculate = (totalCost = 7000000, initionalFee = 1000000, creditTerm = 15 ) => {
        let monPayment; // ежемесячный платеж
        let lounAmount = totalCost - initionalFee; // сумма кредита
        let interestRate = currentProcent; // процентная ставка
        let numberOfYears = creditTerm; // количество лет
        let numberOfMonths = 12 * numberOfYears; // количество месяцев

        monPayment = (lounAmount + (((lounAmount/100) * interestRate) / 12 ) * numberOfMonths) / numberOfMonths;
        let monthlyPaymentRound = Math.round(monPayment)
        if (monthlyPaymentRound < 0) {
            return false;
        } else {
            amountOfCredit.innerHTML = `${lounAmount} ₽`;
            monthlyPayment.innerHTML = `${monthlyPaymentRound} ₽`;
            recommendedIncome.innerHTML = `${monthlyPaymentRound + ((monthlyPaymentRound / 100) * 35)} ₽`
        }
    }
    calculate();

});