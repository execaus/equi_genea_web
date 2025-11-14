import * as yup from "yup";

export const herdCreateScheme = yup.object().shape({
    name: yup.string().min(4, 'Минимум 4 символа').max(64, 'Максимум 64 символа').required('Обязательное поле'),
    description: yup.string().max(1024, 'Максимум 1024 символа'),
});