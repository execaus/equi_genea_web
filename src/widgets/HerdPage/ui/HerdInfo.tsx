import Modal from "react-modal";
import React, { useState } from "react";
import {useParams} from "react-router-dom";
import {useGetHerdByIdQuery} from "../../../entities/herd/api/herdApi.ts";
import HorseCreateCard from "../../../features/horse/ui/HorseCreateCard.tsx";

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const HerdInfo = () => {
    const { id: herdId } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetHerdByIdQuery(herdId);
    const [isHorseModalOpen, setHorseModalOpen] = useState(false);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading herd data</p>}
            {data && (
                <div className="herd-container flex space-x-8">
                    <div className="herd-info flex-1 basis-2/5 form-glass">
                        <h2 className="text-2xl font-bold mb-2 text-white pb-4">{data.herd.name}</h2>
                        <p className="mb-4 text-white">{data.herd.description}</p>
                        <p className="text-sm text-white/40 mb-1 text-right">Создано: {formatDateTime(data.herd.created_at)}</p>
                        <p className="text-sm text-white/40 text-right">Обновлено: {formatDateTime(data.herd.updated_at)}</p>
                    </div>
                    <div className="herd-horses basis-3/4 h-full">
                        <div className="flex justify-between items-center h-full">
                            <h3 className="text-2xl font-semibold text-white">Лошади</h3>
                            <button className="btn btn-primary btn-glass" onClick={() => setHorseModalOpen(true)}>Создать лошадь</button>
                        </div>
                        <ul className="list-disc list-inside">
                            {/*{data.herd.horses?.map((horse: { id: string; name: string }) => (*/}
                            {/*    <li key={horse.id}>{horse.name}</li>*/}
                            {/*))}*/}
                        </ul>
                    </div>
                    <Modal
                        isOpen={isHorseModalOpen}
                        onRequestClose={() => setHorseModalOpen(false)}
                        contentLabel="Создать новую лошадь"
                        overlayClassName="modal-overlay"
                        className="modal-content-large"
                    >
                        <HorseCreateCard setModalIsOpen={setHorseModalOpen} herdId={data.herd.id} />
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default HerdInfo;