import {IHerdCard} from "../../herd/model/types.ts";
import {IHorseGender} from "../../horse-gender/model/types.ts";
import {IHorseBirthplace} from "../../horse-birthplace/model/types.ts";

interface IHorse {
    id: string;
    herd: IHerdCard;
    sire: IHorse;
    dam: IHorse;
    gender: IHorseGender | null;
    name: string | null;
    birthDay: number | null;
    birthMonth: number | null;
    birthYear: number | null;
    birthPlace: IHorseBirthplace | null;
    withersHeight: number | null;
    isPregnant: boolean;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export default IHorse;
