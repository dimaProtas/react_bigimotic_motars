export const required = value => {
    if (value) return undefined;

    return "Field is required"
}

export const maxLengthCreate = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max lenght is ${maxLength} symbols`;
    return undefined
}

//Валидаторы не пригодились, валидацией форм занимается Yup и Formik