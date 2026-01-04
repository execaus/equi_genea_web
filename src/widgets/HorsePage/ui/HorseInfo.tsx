import { useParams } from "react-router-dom";
import {useGetHorseQuery} from "../../../entities/horse/api/horseApi.ts";

const HorseInfo = () => {
    const { id: horseId } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetHorseQuery(horseId);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Карточка лошади</h2>
                {data?.horse?.name && (
                    <span className="text-lg text-white opacity-70">
                        {data.horse.name}
                    </span>
                )}
            </div>

            {isLoading && (
                <div className="glass-card text-white text-center py-6">
                    Загрузка данных...
                </div>
            )}

            {isError && (
                <div className="glass-card text-red-200 text-center py-6">
                    Ошибка загрузки данных
                </div>
            )}

            {data?.horse && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="glass-card text-white space-y-3">
                        <h3 className="text-xl font-semibold mb-2">Основная информация</h3>

                        <p><span className="opacity-70">Имя:</span> {data.horse.name ?? "—"}</p>
                        <p><span className="opacity-70">Пол:</span> {data.horse.gender?.name ?? "—"}</p>
                        <p>
                            <span className="opacity-70">Дата рождения:</span>{" "}
                            {[data.horse.birthDay, data.horse.birthMonth, data.horse.birthYear]
                                .filter(Boolean)
                                .join(".") || "—"}
                        </p>
                        <p><span className="opacity-70">Место рождения:</span> {data.horse.birthPlace?.name ?? "—"}</p>
                        <p><span className="opacity-70">Высота в холке:</span> {data.horse.withersHeight ?? "—"} см</p>
                        <p>
                            <span className="opacity-70">Беременна:</span>{" "}
                            <span className={data.horse.isPregnant ? "text-green-300" : "text-white"}>
                                {data.horse.isPregnant ? "Да" : "Нет"}
                            </span>
                        </p>
                    </div>

                    <div className="glass-card text-white space-y-3">
                        <h3 className="text-xl font-semibold mb-2">Описание</h3>

                        <p className="opacity-90 whitespace-pre-line">
                            {data.horse.description ?? "Описание отсутствует"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HorseInfo;