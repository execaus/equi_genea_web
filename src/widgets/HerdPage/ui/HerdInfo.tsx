import Modal from "react-modal";
import React, { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetHerdByIdQuery, useGetHerdHorsesQuery} from "../../../entities/herd/api/herdApi.ts";
import HorseCreateCard from "../../../features/horse/ui/HorseCreateCard.tsx";
import HorseCard from "../../../features/horse/ui/HorseCard.tsx";

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const HerdInfo = () => {
    const { id: herdId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: herdData, error: herdError, isLoading: herdIsLoading } = useGetHerdByIdQuery(herdId);
    const { data: horsesData, error: horsesError, isFetching: horsesIsFetching } = useGetHerdHorsesQuery({
        id: herdId,
        page: 1,
        limit: 32,
        search: "",
    });
    const [isHorseModalOpen, setHorseModalOpen] = useState(false);

    const onHorseCardClick = (id: string) => {
        navigate(`/horse/${id}`);
    }

    return (
        <div>
            {herdIsLoading && <p>Loading...</p>}
            {(herdError || horsesError) && <p>Error loading herd data</p>}
            {herdData && (
                <div className="herd-container flex flex-col">
                    <div className="flex">
                        <div className="herd-info form-glass">
                            <h2 className="text-2xl font-bold mb-2 text-white pb-4">{herdData.herd.name}</h2>
                            <p className="mb-4 text-white">{herdData.herd.description}</p>
                            <p className="text-sm text-white/40 mb-1 text-right">Создано: {formatDateTime(herdData.herd.createdAt)}</p>
                            <p className="text-sm text-white/40 text-right">Обновлено: {formatDateTime(herdData.herd.updatedAt)}</p>
                        </div>
                        <div className="h-full flex justify-end ml-4">
                            <button className="btn btn-primary btn-glass text-nowrap" onClick={() => setHorseModalOpen(true)}>Создать лошадь</button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-8">
                        {horsesError && <div>Ошибка: {horsesError.toString()}</div>}
                        {!horsesError && horsesData &&
                            horsesData.horses.map(horse => (
                                <HorseCard
                                    key={horse.id}
                                    horse={horse}
                                    onClick={() => onHorseCardClick(horse.id)}
                                    skeletonMode={horsesIsFetching}
                                />
                            ))}
                    </div>
                    <Modal
                        isOpen={isHorseModalOpen}
                        onRequestClose={() => setHorseModalOpen(false)}
                        contentLabel="Создать новую лошадь"
                        overlayClassName="modal-overlay"
                        className="modal-content-large"
                    >
                        <HorseCreateCard setModalIsOpen={setHorseModalOpen} herdId={herdData.herd.id} />
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default HerdInfo;