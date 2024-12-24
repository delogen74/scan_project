export const validateINN = (inn) => {
    // Проверка на 10 цифр для организаций в России
    const innRegex = /^\d{10}$/;
    return innRegex.test(inn);
};
