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
import BirthDateInput from "../../../shared/ui/BirthDateInput.tsx";
import { useCreateHorseMutation } from "../../../entities/horse/api/horseApi.ts";

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
    const [createHorse, { isLoading: isCreating }] = useCreateHorseMutation();

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
                            initialValues={{
                                name: '',
                                description: '',
                                gender: '',
                                color: '',
                                birthplace: '',
                                geneticMarker: [],
                                bloodlines: [],
                                pregnancyStatus: false,
                                withersHeight: '',
                                birthDay: '',
                                birthMonth: '',
                                birthYear: '',
                                unknownDay: false,
                                unknownMonth: false,
                                unknownYear: false
                            }}
                            validate={values => {
                                const errors: { name?: string; gender?: string; color?: string; birthplace?: string; geneticMarker?: string; withersHeight?: string; birthDay?: string; birthMonth?: string; birthYear?: string } = {};
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
                                if (values.withersHeight && !/^\d+$/.test(values.withersHeight)) {
                                    errors.withersHeight = 'Допускаются только целые числа';
                                }
                                // Проверка дня рождения
                                if (!values.unknownDay) {
                                    if (
                                        values.birthDay === '' ||
                                        Number(values.birthDay) <= 0 ||
                                        !/^\d+$/.test(values.birthDay)
                                    ) {
                                        errors.birthDay = 'Укажите корректный день или отметьте "Неизвестно"';
                                    } else {
                                        const d = parseInt(values.birthDay, 10);
                                        if (d < 1 || d > 31) errors.birthDay = 'Некорректный день';
                                    }
                                }
                                // Проверка месяца рождения
                                if (!values.unknownMonth) {
                                    if (
                                        values.birthMonth === '' ||
                                        Number(values.birthMonth) <= 0 ||
                                        !/^\d+$/.test(values.birthMonth)
                                    ) {
                                        errors.birthMonth = 'Укажите корректный месяц или отметьте "Неизвестно"';
                                    } else {
                                        const m = parseInt(values.birthMonth, 10);
                                        if (m < 1 || m > 12) errors.birthMonth = 'Некорректный месяц';
                                    }
                                }
                                // Проверка года рождения: год должен быть положительным, не в будущем и не нулём
                                if (!values.unknownYear) {
                                    if (
                                        values.birthYear === '' ||
                                        Number(values.birthYear) <= 0 ||
                                        !/^\d+$/.test(values.birthYear)
                                    ) {
                                        errors.birthYear = 'Укажите корректный год или отметьте "Неизвестно"';
                                    } else {
                                        const y = parseInt(values.birthYear, 10);
                                        const currentYear = new Date().getFullYear();
                                        if (y > currentYear) {
                                            errors.birthYear = 'Некорректный год';
                                        }
                                    }
                                }
                                return errors;
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    console.log(values);
                                    await createHorse({
                                        herd: herdId,
                                        gender: values.gender,
                                        name: values.name.trim() === "" ? null : values.name,
                                        description: values.description.trim() === "" ? null : values.description.trim(),
                                        birthDay: values.unknownDay ? null : Number(values.birthDay),
                                        birthMonth: values.unknownMonth ? null : Number(values.birthMonth),
                                        birthYear: values.unknownYear ? null : Number(values.birthYear),
                                        birthPlace: values.birthplace === "" ? null : values.birthplace,
                                        withersHeight: Number(values.withersHeight),
                                        sire: null, // TODO
                                        dam: null, // TODO
                                        isPregnant: values.pregnancyStatus,
                                        geneticMarkers: values.geneticMarker,
                                        color: values.color,
                                        breeds: values.bloodlines.map(bloodline => ({
                                            ...bloodline,
                                            percentage: (bloodline.percentage / 16) * 10000,
                                        })),
                                    }).unwrap();

                                    handleClose();
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                                <Form>
                                    <label htmlFor="name" className="font-semibold text-lg mb-1 text-white block">Имя лошади</label>
                                    <Field name="name" className="input-glass mb-2 w-full" />
                                    <ErrorMessage name="name" component="div" className="text-black text-sm mb-2" />

                                    <label htmlFor="description" className="font-semibold text-lg mb-1 text-white block">Описание</label>
                                    <Field name="description" as="textarea" className="input-glass mb-2 w-full" />

                                    <div className="flex flex-row space-x-6">
                                        <div className="flex flex-col space-x-4">
                                            <OptionGrid
                                                labelName="Пол"
                                                elements={genderData.genders?.map(elem => ({label: elem.name, value: elem.id})) as IOptionGridElement[]}
                                                setValue={value => {
                                                    setFieldValue('gender', value);
                                                }}
                                            />
                                            <ErrorMessage name="gender" component="div" className="text-black text-sm mb-2" />
                                        </div>

                                        <div className="flex flex-col space-x-4">
                                            <OptionGrid
                                                labelName="Масть"
                                                elements={colorData.colors?.map(elem => ({label: elem.name, value: elem.id})) as IOptionGridElement[]}
                                                setValue={value => {
                                                    setFieldValue('color', value);
                                                }}
                                            />
                                            <ErrorMessage name="color" component="div" className="text-black text-sm mb-2" />
                                        </div>

                                        <div className="flex flex-col space-x-4">
                                            <OptionGrid
                                                labelName="Генетические маркеры"
                                                elements={geneticMarkerData.geneticMarkers?.map(elem => ({ label: elem.name, value: elem.id })) as IOptionGridElement[]}
                                                setValue={value => {
                                                    setFieldValue('geneticMarker', value);
                                                }}
                                                multiSelect={true}
                                            />
                                            <ErrorMessage name="geneticMarker" component="div" className="text-black text-sm mb-2" />
                                        </div>
                                    </div>

                                    <div className="flex flex-row space-x-6">
                                        <div className="flex flex-col w-1/3">
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
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="withersHeight" className="font-semibold text-lg text-white mb-1">Высота в холке (см)</label>
                                            <Field
                                                name="withersHeight"
                                                className="input-glass w-32"
                                            />
                                            <ErrorMessage name="withersHeight" component="div" className="text-black text-sm" />
                                        </div>
                                        <div className="flex flex-col space-x-2 space-y-2">
                                            <label className="text-white font-semibold text-lg" htmlFor="pregnancyStatus">Беременна</label>
                                            <Field
                                                type="checkbox"
                                                name="pregnancyStatus"
                                                className="checkbox-glass"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-1/2 pb-4">
                                        <BirthDateInput values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
                                    </div>

                                    <div>
                                        <label className="text-lg font-semibold text-white">Выбор породы </label>
                                        <BloodlineSelector breeds={breedData.breeds} setFieldValue={setFieldValue} values={values} />
                                    </div>

                                    <div className="flex flex-col space-y-2 mt-4">
                                        <button type="submit" className="btn-glass" disabled={isSubmitting || isCreating}>
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