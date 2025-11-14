import {useState} from "react";
import {Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer} from "recharts";
import {useFormikContext, Field, ErrorMessage, FormikValues} from "formik";
import validationSchema from "../model/validation.ts";
import {IHorseBreed} from "../../../../entities/breed/model/types.ts";

interface BloodlineSelectorProps {
    breeds: IHorseBreed[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    values: FormikValues;
}

const BloodlineSelector = (props: BloodlineSelectorProps) => {
    const { values, setFieldValue, setErrors } = useFormikContext<any>();
    const [bloodlines, setBloodlines] = useState<{ breed: string; percentage: number }[]>([]);

    const handleAdd = async () => {
        try {
            await validationSchema.validate(
                {
                    selectedBreed: values.selectedBreed,
                    percentage: values.percentage,
                },
                { abortEarly: false }
            );

            if (bloodlines.some(b => b.breed === values.selectedBreed)) {
                setErrors({ selectedBreed: "Эта порода уже добавлена" });
                return;
            }

            const percNum = Number(values.percentage);
            const totalPercentage = bloodlines.reduce((sum, b) => sum + b.percentage, 0);
            if (totalPercentage + percNum > 16) {
                setErrors({ percentage: "Общая кровность не может превышать 16" });
                return;
            }

            const newBloodlines = [...bloodlines, { breed: values.selectedBreed, percentage: percNum }];
            setBloodlines(newBloodlines);
            setFieldValue("bloodlines", newBloodlines);

            // Сброс полей selectedBreed и percentage
            setFieldValue("selectedBreed", "");
            setFieldValue("percentage", "");
            setErrors({});
        } catch (err: any) {
            if (err.inner) {
                const formErrors: any = {};
                err.inner.forEach((validationError: any) => {
                    if (validationError.path) {
                        formErrors[validationError.path] = validationError.message;
                    }
                });
                setErrors(formErrors);
            }
        }
    };

    const handleRemove = (indexToRemove: number) => {
        const newBloodlines = bloodlines.filter((_, idx) => idx !== indexToRemove);
        setBloodlines(newBloodlines);
        setFieldValue("bloodlines", newBloodlines);
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#33AA99"];

    const totalPercentage = bloodlines.reduce((sum, b) => sum + b.percentage, 0);
    const pieData = [{ breed: "Неизвестно", percentage: 16 - totalPercentage }, ...bloodlines];

    return (
        <div className="flex space-x-4">
            {/* Вторая колонка: круговая диаграмма */}
            <div className="flex-1" style={{ height: 500, outline: 'none' }}>
                <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="percentage"
                            nameKey="breed"
                            outerRadius="80%"
                            fill="#8884d8"
                            label={{ fill: 'white' }}
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.breed === "Неизвестно" ? "rgba(113,113,113,0.46)" : COLORS[(index - 1) % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend formatter={(value) => <span style={{ color: 'white' }}>{value}</span>} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Первая колонка */}
            <div className="flex-1 flex flex-col space-y-4">
                {/* Верхний блок: выбор и добавление */}
                <div className="flex flex-row space-x-2 p-2 rounded">
                    <div className="flex flex-col flex-3">
                        <label className="font-semibold text-white">Порода</label>
                        <Field
                            as="select"
                            name="selectedBreed"
                            className="input-glass w-full"
                            value={values.selectedBreed ?? ""}
                        >
                            <option value="">Выберите породу</option>
                            {props.breeds.map(b => (
                                <option key={b.id} value={b.name}>{b.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="selectedBreed" component="div" className="error-glass text-sm" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-semibold text-white">Кровность (дробь ?/16)</label>
                        <Field
                            type="number"
                            name="percentage"
                            className="input-glass w-full no-spinner"
                            placeholder="Число от 1 до 16"
                            value={values.percentage ?? ""}
                        />
                        <ErrorMessage name="percentage" component="div" className="error-glass text-sm" />
                    </div>
                    <div className="flex items-end">
                        <button type="button" className="btn-glass" onClick={handleAdd}>Добавить</button>
                    </div>
                </div>

                {/* Нижний блок: список добавленных пород */}
                <div className="p-2 rounded">
                    <h3 className="text-white font-semibold mb-2">Текущие породы</h3>
                    <ul className="text-white space-y-2">
                        {bloodlines.map((b, index) => (
                            <li
                                key={index}
                                className="list-item-glass relative flex justify-between items-center"
                            >
                                <span>{b.breed}: {b.percentage}/16</span>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="text-white font-bold ml-4 cursor-pointer"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BloodlineSelector;