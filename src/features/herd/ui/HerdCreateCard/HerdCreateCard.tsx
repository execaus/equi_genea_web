import {ErrorMessage, Field, Form, Formik} from "formik";
import {herdCreateScheme} from "../../model/validation.ts";
import {useState} from "react";
import {useCreateHerdMutation} from "../../../../entities/herd/api/herdApi.ts";

interface IHerdCreateCardProps {
    setModalIsOpen: (isOpen: boolean) => void;
    onCreate?: () => void;
}

const HerdCreateCard = (props: IHerdCreateCardProps) => {
    const {setModalIsOpen} = props;
    const [serverError, setServerError] = useState<string | null>(null);
    const [createHerd, { isLoading }] = useCreateHerdMutation();

    return (
        <Formik
            initialValues={{ name: '', description: '' }}
            validationSchema={herdCreateScheme}
            onSubmit={async (values, { setSubmitting }) => {
                setServerError(null);
                try {
                    await createHerd(values).unwrap();
                    setModalIsOpen(false);
                    props.onCreate?.();
                } catch (err: any) {
                    setServerError(err?.data?.message || 'Ошибка создания');
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <>
                    <h2 className="text-2xl font-bold text-white mb-4">Создание стада</h2>
                    <Form className="form-default">
                        <div className={"field-glass"}>
                            <label className="label-glass">Имя</label>
                            <Field name="name" className="input-glass" />
                            <ErrorMessage name="name" component="div" className="error-glass" />
                        </div>

                        <div className={"field-glass"}>
                            <label className="label-glass">Описание</label>
                            <Field as="textarea" name="description" className="input-glass" rows={4} />
                            <ErrorMessage name="description" component="div" className="error-glass" />
                        </div>

                        {serverError && <div>{serverError}</div>}

                        <button type="submit" disabled={isSubmitting || isLoading} className="btn-glass mt-6">
                            {isLoading ? 'Создание...' : 'Создать'}
                        </button>
                        <button className="btn-glass mt-2" onClick={() => setModalIsOpen(false)}>Закрыть</button>
                    </Form>
                </>
            )}
        </Formik>
    );
};

export default HerdCreateCard;