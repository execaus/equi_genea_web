import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Неверный email').required('Обязательное поле'),
    password: yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
});

export const registerSchema = yup.object().shape({
    email: yup.string().email('Неверный email').required('Обязательное поле'),
});