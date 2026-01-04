import {useParams} from "react-router-dom";

const HorseInfo = () => {
    const { id: horseId } = useParams<{ id: string }>();

    return (
        <div>
            {horseId}
        </div>
    );
};

export default HorseInfo;