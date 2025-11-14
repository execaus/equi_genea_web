import { useState } from "react";
import Modal from "react-modal";
import HerdCreateCard from "../../../features/herd/ui/HerdCreateCard/HerdCreateCard.tsx";
import { useGetHerdAllQuery } from "../../../entities/herd/api/herdApi.ts";
import HerdCard from "../../../features/herd/ui/HerdCard/HerdCard.tsx";
import { useNavigate } from "react-router-dom";

const HerdList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { data, isFetching, error, refetch } = useGetHerdAllQuery({ page: 0, limit: 10, search });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onCardClick = (id: string) => {
        navigate(`/herd/${id}`);
    };

    return (
        <div>
            <div className={"flex justify-between items-center mb-4"}>
                <button className={"btn-glass "} onClick={() => setModalIsOpen(true)}>Создать табун</button>
                <input className="input-glass" type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Создать новый табун"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <HerdCreateCard setModalIsOpen={setModalIsOpen} onCreate={() => refetch()} />
            </Modal>

            <div className="flex flex-wrap gap-4">
                {error && <div>Ошибка: {error.toString()}</div>}
                {!error && data &&
                    data.herds.map((card) => (
                        <HerdCard
                            key={card.id}
                            card={card}
                            onClick={() => onCardClick(card.id)}
                            skeletonMode={isFetching}
                        />
                    ))}
            </div>
        </div>
    );
};

export default HerdList;
