import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DinoType, type DinoWaveActionProps, type WaveAction } from '@/lib/levelModules/wavemanager/types';
import { useState } from 'react';

export function SummonDinoAction({ waveaction }: { waveaction: WaveAction<DinoWaveActionProps> }) {
    const [dinoType, _setDinoType] = useState(waveaction.data.DinoType);
    const setDinoType = (val: DinoType) => {
        waveaction.data.DinoType = val;
        _setDinoType(val);
    };

    const [dinoRow, _setDinoRow] = useState(waveaction.data.DinoRow);
    const setDinoRow = (val: number | undefined) => {
        waveaction.data.DinoRow = Number(val) - 1;
        _setDinoRow(Number(val) - 1);
    };

    const [waveDuration, _setWaveDuration] = useState(waveaction.data.DinoWaveDuration);
    const setWaveDuration = (val: number | undefined) => {
        waveaction.data.DinoWaveDuration = val;
        _setWaveDuration(val);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Dinosaur Type</Label>
                <Select value={dinoType} onValueChange={setDinoType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Dino Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Dinosaurs</SelectLabel>
                            <SelectItem value={DinoType.RAPTOR}>Raptor</SelectItem>
                            <SelectItem value={DinoType.STEGOSAURUS}>Stegosaurus</SelectItem>
                            <SelectItem value={DinoType.PTEROSAUR}>Pterosaur</SelectItem>
                            <SelectItem value={DinoType.TYRANNOSAURUS}>Tyrannosaurus Rex</SelectItem>
                            <SelectItem value={DinoType.ANKLYOSAURUS}>Ankylosaurus</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Dinosaur Row</Label>
                <OptionalNumberInput
                    placeholder="1"
                    min={1}
                    max={5}
                    optional={false}
                    value={dinoRow + 1}
                    onChange={setDinoRow}
                />
            </div>
            <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
                <Label>Wave Duration</Label>
                <OptionalNumberInput placeholder="None" min={0} value={waveDuration} onChange={setWaveDuration} />
            </div>
        </div>
    );
}
