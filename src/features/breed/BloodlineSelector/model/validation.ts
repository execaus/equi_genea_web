import * as Yup from "yup";

const validationSchema = Yup.object({
    selectedBreed: Yup.string().required("Выберите породу"),
    percentage: Yup.number()
        .typeError("Введите число")
        .min(0.1, "Минимум 0.1")
        .max(16, "Максимум 16")
        .required("Введите кровность"),
});

export default validationSchema;