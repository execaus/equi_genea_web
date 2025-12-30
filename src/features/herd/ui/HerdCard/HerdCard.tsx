import type {IHerdCard} from "../../../../entities/herd/model/types.ts";

interface IHeroCardProps {
    card: IHerdCard,
    onClick?: (id: string) => void,
    skeletonMode?: boolean,
}

const HerdCard = (props: IHeroCardProps) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
    };

    return (
        <div
            key={props.card.id}
            onClick={() => props.onClick ? props.onClick(props.card.id) : undefined}
            className={`card-glass ${props.skeletonMode ? "animate-pulse pointer-events-none" : ""}`}
        >
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">{props.card.name}</h3>
                <p className={`mb-6 overflow-hidden line-clamp-8 text-sm ${
                  props.card.description
                    ? "text-white/80"
                    : "text-white/40"
                }`}>
                  {props.card.description ? props.card.description : "Описание отсутствует"}
                </p>
            </div>
            <div className="mt-auto text-white/60 text-sm flex flex-col items-end">
                <p className="mb-1 flex items-center"><span className="mr-1">Создано:</span> {formatDateTime(props.card.createdAt)}</p>
                <p className="flex items-center"><span className="mr-1">Обновлено:</span> {formatDateTime(props.card.updatedAt)}</p>
            </div>
        </div>
    );
};

export default HerdCard;