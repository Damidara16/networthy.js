const luhnCheck = num => {
    const arr = (num + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
        (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
};

const validateCard = (cardData) => {
    let errors = []
    let errorFields = {
        cardNumber: false,
        expiry: false,
        cvv: false,
    }

    const { cardNumber, expiry, cvv } = cardData;
    if (!luhnCheck(cardNumber)) {
        errors.push("Incorrect credit card number format, please use a valid card");
        errorFields = { ...errorFields, cardNumber: true }
    }

    if (cardData.expiry.length === 0) {
        errors.push("You are missing a expiry, please provide a expiry");
        errorFields = { ...errorFields, expiry: true }
    }

    const [year, month] = expiry.split("-")
    const inputDate = new Date(year, Number(month), 0);
    const today = new Date();
    const lastDayOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (inputDate < lastDayOfTheMonth) {
        errors.push("You are missing a valid expiry, this expiry has past");
        errorFields = { ...errorFields, expiry: true }
    }

    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(lastDayOfTheMonth.getFullYear() + 5)

    if (inputDate > fiveYearsAgo) {
        errors.push("You are missing a valid expiry, this expiry is more than 5 years");
        errorFields = { ...errorFields, expiry: true }
    }

    if (cvv.length !== 3 && cvv.length !== 4) {
        errors.push("You are missing a valid cvv, please provide a valid cvv");
        errorFields = { ...errorFields, cvv: true }
    }

    return [errors, errorFields]
}

module.exports = validateCard;