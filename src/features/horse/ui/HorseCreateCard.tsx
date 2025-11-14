import {useState} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {useGetHorseGenderAllQuery} from "../../../entities/horse-gender/api/horseGenderApi.ts";
import {useGetHorseColorAllQuery} from "../../../entities/horse-color/api/horseColorApi.ts";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import OptionGrid, {IOptionGridElement} from "../../../shared/ui/OptionGrid.tsx";
import {useGetHorseBirthplaceAllQuery} from "../../../entities/horse-birthplace/api/horseBirthplaceApi.ts";
import {useGetHorseGeneticMarkerAllQuery} from "../../../entities/horse-genetic-marker/api/horseGeneticMarkerApi.ts";
import {useGetHorseBreedAllQuery} from "../../../entities/breed/api/horseBreedApi.ts";
import BloodlineSelector from "../../breed/BloodlineSelector/ui/BloodlineSelector.tsx";

interface IHorseCreateCardProps {
    herdId: string;
    setModalIsOpen?: (isOpen: boolean) => void;
}

const HorseCreateCard = (props: IHorseCreateCardProps) => {
    const { herdId, setModalIsOpen } = props;

    const { data: genderData, isLoading: isGenderLoading, isError: isGenderError } = useGetHorseGenderAllQuery();
    const { data: colorData, isLoading: isColorLoading, isError: isColorError } = useGetHorseColorAllQuery();
    const { data: birthplaceData, isLoading: isBirthplaceLoading, isError: isBirthplaceError } = useGetHorseBirthplaceAllQuery();
    const { data: geneticMarkerData, isLoading: isGeneticMarkerLoading, isError: isGeneticMarkerError } = useGetHorseGeneticMarkerAllQuery();
    const { data: breedData, isLoading: isBreedLoading, isError: isBreedError } = useGetHorseBreedAllQuery();

    const handleClose = () => {
        if (setModalIsOpen) {
            setModalIsOpen(false);
        }
    };

    return (
        <div className="flex flex-col space-y-2 mt-4">
            <h2 className="text-2xl font-bold text-white mb-4 text-left">Создание лошади</h2>
            {
                (isGenderError || isColorError || isBirthplaceError || isGeneticMarkerError || isBreedError)
                    ? <p>Ошибка загрузки данных</p>
                    : (isGenderLoading || isColorLoading || isBirthplaceLoading || isGeneticMarkerLoading || isBreedLoading)
                        ? <p>Загрузка данных...</p>
                        : <Formik
                            initialValues={{ name: '', gender: '', color: '', birthplace: '', geneticMarker: [], bloodlines: [] }}
                            validate={values => {
                                const errors: { name?: string; gender?: string; color?: string; birthplace?: string; geneticMarker?: string } = {};
                                if (!values.name) {
                                    errors.name = 'Обязательное поле';
                                }
                                if (!values.gender) {
                                    errors.gender = 'Обязательное поле';
                                }
                                if (!values.color) {
                                    errors.color = 'Обязательное поле';
                                }
                                if (!values.geneticMarker || values.geneticMarker.length === 0) {
                                    errors.geneticMarker = 'Обязательное поле';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                setSubmitting(false);
                                handleClose();
                            }}
                        >
                            {({ values, setFieldValue, isSubmitting }) => (
                                <Form>
                                    <label htmlFor="name" className="font-semibold text-lg mb-1 text-white block">Имя лошади</label>
                                    <Field name="name" className="input-glass mb-2 w-full" />
                                    <ErrorMessage name="name" component="div" className="text-black text-sm mb-2" />

                                    <OptionGrid
                                        labelName="Пол"
                                        elements={genderData.genders?.map(elem => ({label: elem.name, value: elem.id})) as IOptionGridElement[]}
                                        setValue={value => {
                                            setFieldValue('gender', value);
                                        }}
                                    />
                                    <ErrorMessage name="gender" component="div" className="text-black text-sm mb-2" />


                                    <OptionGrid
                                        labelName="Масть"
                                        elements={colorData.colors?.map(elem => ({label: elem.name, value: elem.id})) as IOptionGridElement[]}
                                        setValue={value => {
                                            setFieldValue('color', value);
                                        }}
                                    />
                                    <ErrorMessage name="color" component="div" className="text-black text-sm mb-2" />

                                    <label htmlFor="birthplace" className="font-semibold text-lg mb-1 text-white block">Место рождения</label>
                                    <Field
                                        name="birthplace"
                                        as="select"
                                        className="input-glass mb-2 w-full"
                                    >
                                        <option value="">Неизвестно</option>
                                        {birthplaceData.birthplaces?.map((elem: any) => (
                                            <option key={elem.id} value={elem.id}>{elem.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="birthplace" component="div" className="text-black text-sm mb-2" />

                                    <OptionGrid
                                        labelName="Генетические маркеры"
                                        elements={geneticMarkerData.geneticMarkers?.map(elem => ({ label: elem.name, value: elem.id })) as IOptionGridElement[]}
                                        setValue={value => {
                                            setFieldValue('geneticMarker', value);
                                        }}
                                        multiSelect={true}
                                    />
                                    <ErrorMessage name="geneticMarker" component="div" className="text-black text-sm mb-2" />

                                    <div>
                                        <label className="text-lg font-semibold text-white">Выбор породы </label>
                                        <BloodlineSelector breeds={breedData.breeds} setFieldValue={setFieldValue} values={values} />
                                    </div>

                                    <div className="flex flex-col space-y-2 mt-4">
                                        <button type="submit" className="btn-glass" disabled={isSubmitting}>
                                            {isSubmitting ? 'Создание...' : 'Создать'}
                                        </button>
                                        <button type="button" className="btn-glass" onClick={handleClose}>Закрыть</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
            }
        </div>
    );
};

export default HorseCreateCard;