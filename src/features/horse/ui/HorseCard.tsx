import IHorse from "../../../entities/horse/model/horse.ts";

interface IHorseCardProps {
    horse: IHorse;
    onClick?: (id: string) => void;
    skeletonMode?: boolean;
}

const HorseCard = (props: IHorseCardProps) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div
            key={props.horse.id}
            onClick={() =>
                props.onClick ? props.onClick(props.horse.id) : undefined
            }
            className={`card-glass ${
                props.skeletonMode ? "animate-pulse pointer-events-none" : ""
            }`}
        >
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    {props.horse.name}
                </h3>

                <p
                    className={`mb-6 overflow-hidden line-clamp-8 text-sm ${
                        props.horse.description
                            ? "text-white/80"
                            : "text-white/40"
                    }`}
                >
                    {props.horse.description || "Описание отсутствует"}
                </p>
            </div>

            <div className="mt-auto text-white/60 text-sm flex flex-col items-end">
                <p className="mb-1 flex items-center">
                    <span className="mr-1">Создано:</span>
                    {formatDateTime(props.horse.createdAt)}
                </p>
                <p className="flex items-center">
                    <span className="mr-1">Обновлено:</span>
                    {formatDateTime(props.horse.updatedAt)}
                </p>
            </div>
        </div>
    );
};

export default HorseCard;
