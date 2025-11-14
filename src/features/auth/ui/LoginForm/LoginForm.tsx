import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import {useSignInMutation} from "../../api/authApi.ts";
import {loginSchema} from "../../model/validation.ts";
import {setAccount} from "../../../../entities/account/model/accountSlice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

interface ILoginFormProps {
    setMode: (mode: 'login' | 'register') => void;
}

export const LoginForm = ({ setMode }: ILoginFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useSignInMutation();
    const [serverError, setServerError] = useState<string | null>(null);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setServerError(null);
                try {
                    const response = await login(values).unwrap();
                    dispatch(setAccount({ token: response.token }));
                    navigate('/');
                } catch (err: any) {
                    setServerError(err?.data?.message || 'Ошибка входа');
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="form-glass">
                    <div className="field-glass">
                        <label className="label-glass">Email</label>
                        <Field
                            name="email"
                            type="email"
                            className="input-glass"
                        />
                        <ErrorMessage name="email" component="div" className="error-glass" />
                    </div>

                    <div className="field-glass">
                        <label className="label-glass">Пароль</label>
                        <Field
                            name="password"
                            type="password"
                            className="input-glass"
                        />
                        <ErrorMessage name="password" component="div" className="error-glass" />
                    </div>

                    {serverError && <div className="text-xs text-red-300 mb-4">{serverError}</div>}

                    <div className={"mt-6"}>
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="btn-glass mr-2"
                        >
                            {isLoading ? 'Вход...' : 'Войти'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('register')}
                            className="btn-glass"
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
