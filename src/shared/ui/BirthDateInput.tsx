import { Field } from 'formik';

interface IBirthDateInputInputProps {
    values: any;
    setFieldValue: (field: string, value: any) => void;
    errors?: any;
    touched?: any;
}

const BirthDateInput = ({ values, setFieldValue, errors, touched }: IBirthDateInputInputProps) => {
    return (
        <div className="mt-4">
            <label className="font-semibold text-lg mb-2 text-white block">Дата рождения</label>

            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label className="text-white mb-1">День</label>
                    <div className="flex items-center space-x-2">
                        {!values.unknownDay && (
                            <Field name="birthDay" type="text" className="input-glass w-16" />
                        )}
                        <label className="text-white flex items-center">
                            <Field
                                type="checkbox"
                                name="unknownDay"
                                className="checkbox-glass"
                                onChange={() => setFieldValue('unknownDay', !values.unknownDay)}
                            />
                            <span className="ml-1 text-sm">Неизвестно</span>
                        </label>
                    </div>
                    {!values.unknownDay && errors?.birthDay && touched?.birthDay && (
                        <div className="text-black text-sm">{errors.birthDay}</div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-white mb-1">Месяц</label>
                    <div className="flex items-center space-x-2">
                        {!values.unknownMonth && (
                            <Field name="birthMonth" type="text" className="input-glass w-16" />
                        )}
                        <label className="text-white flex items-center">
                            <Field
                                type="checkbox"
                                name="unknownMonth"
                                className="checkbox-glass"
                                onChange={() => setFieldValue('unknownMonth', !values.unknownMonth)}
                            />
                            <span className="ml-1 text-sm">Неизвестно</span>
                        </label>
                    </div>
                    {!values.unknownMonth && errors?.birthMonth && touched?.birthMonth && (
                        <div className="text-black text-sm">{errors.birthMonth}</div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-white mb-1">Год</label>
                    <div className="flex items-center space-x-2">
                        {!values.unknownYear && (
                            <Field name="birthYear" type="text" className="input-glass w-20" />
                        )}
                        <label className="text-white flex items-center">
                            <Field
                                type="checkbox"
                                name="unknownYear"
                                className="checkbox-glass"
                                onChange={() => setFieldValue('unknownYear', !values.unknownYear)}
                            />
                            <span className="ml-1 text-sm">Неизвестно</span>
                        </label>
                    </div>
                    {!values.unknownYear && errors?.birthYear && touched?.birthYear && (
                        <div className="text-black text-sm">{errors.birthYear}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BirthDateInput;