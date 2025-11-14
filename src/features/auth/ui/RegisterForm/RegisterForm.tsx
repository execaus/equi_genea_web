import {ErrorMessage, Field, Form, Formik} from "formik";
import {registerSchema} from "../../model/validation.ts";
import {useSignUpMutation} from "../../api/authApi.ts";
import {useState} from "react";
import {setAccount} from "../../../../entities/account/model/accountSlice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

interface IRegisterFormProps {
    setMode: (mode: 'login' | 'register') => void;
}

const RegisterForm = (props: IRegisterFormProps) => {
    const [registration, { isLoading }] = useSignUpMutation();
    const dispatch = useDispatch();
    const [serverError, setServerError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSignIn = () => {
        props.setMode('login');
    }

    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setServerError(null);
                try {
                    const response = await registration(values).unwrap();
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
                    <div className={"field-glass"}>
                        <label className="label-glass">Email</label>
                        <Field name="email" type="email" className="input-glass" />
                        <ErrorMessage name="email" component="div" className="error-glass" />
                    </div>

                    {serverError && <div>{serverError}</div>}

                    <div className={"mt-6"}>
                        <button type="submit" disabled={isSubmitting} className="btn-glass mr-2">
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                        <button onClick={onSignIn} className="btn-glass">
                            Войти
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;