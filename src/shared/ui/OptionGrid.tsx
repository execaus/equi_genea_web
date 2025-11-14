import React from 'react';

export interface IOptionGridElement {
    label: string;
    value: string;
}

interface IOptionGridProps {
    elements: IOptionGridElement[];
    setValue: (value: string | string[]) => void;
    labelName: string;
    multiSelect?: boolean;
}

const OptionGrid = (props: IOptionGridProps) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    const handleClick = (elementValue: string) => {
        if (props.multiSelect) {
            if (selectedValues.includes(elementValue)) {
                const newValues = selectedValues.filter(v => v !== elementValue);
                setSelectedValues(newValues);
                props.setValue(newValues);
            } else {
                const newValues = [...selectedValues, elementValue];
                setSelectedValues(newValues);
                props.setValue(newValues);
            }
        } else {
            setSelectedValues([elementValue]);
            props.setValue(elementValue);
        }
    };

    return (
        <div>
            <label className="font-semibold text-lg mb-3 text-white block">
                {props.labelName}
            </label>
            <div className="flex flex-wrap gap-4 mb-4">
                {props.elements.map((element) => (
                    <button
                        key={element.value}
                        type="button"
                        className={`w-24 h-24 flex items-center justify-center border-transparent rounded-lg cursor-pointer text-white ${selectedValues.includes(element.value) ? 'bg-blue-500 border-blue-700' : 'btn-glass'}`}
                        onClick={() => handleClick(element.value)}
                    >
                        <span className="text-white">{element.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionGrid;