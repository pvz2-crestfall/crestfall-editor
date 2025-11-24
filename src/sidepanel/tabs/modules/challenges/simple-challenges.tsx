import { Label } from '@/components/ui/label';
import { OptionalNumberInput } from '@/components/ui/optional-ninput';
import { gridState } from '@/lib/state/gridstate';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

function NumberChallenge({
    label,
    value,
    onChange,
}: {
    label: string;
    value?: number;
    onChange: (value?: number) => void;
}) {
    return (
        <div className="flex w-full items-center justify-between border rounded-md px-4 py-2">
            <Label>{label}</Label>
            <OptionalNumberInput placeholder="" value={value} onChange={onChange} />
        </div>
    );
}

export function PlantsLostChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [plantsLost, setPlantsLost] = useState(levelBuilder.challengeManager.plantsLost);

    useEffect(() => {
        levelBuilder.challengeManager.plantsLost = plantsLost;
    }, [plantsLost]);

    return <NumberChallenge label="Plants Lost" value={plantsLost} onChange={setPlantsLost} />;
}

export function MaxPlantsChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [maxPlants, setMaxPlants] = useState(levelBuilder.challengeManager.maxPlants);

    useEffect(() => {
        levelBuilder.challengeManager.maxPlants = maxPlants;
    }, [maxPlants]);

    return <NumberChallenge label="Max Plants" value={maxPlants} onChange={setMaxPlants} />;
}

export function SunProductionChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [sunProduced, setSunProduced] = useState(levelBuilder.challengeManager.sunProduced);

    useEffect(() => {
        levelBuilder.challengeManager.sunProduced = sunProduced;
    }, [sunProduced]);

    return <NumberChallenge label="Sun Production" value={sunProduced} onChange={setSunProduced} />;
}

export function MaxSunUsedChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [sunUsed, setSunUsed] = useState(levelBuilder.challengeManager.maxSunUsed);

    useEffect(() => {
        levelBuilder.challengeManager.maxSunUsed = sunUsed;
    }, [sunUsed]);

    return <NumberChallenge label="Max Sun Spent" value={sunUsed} onChange={setSunUsed} />;
}

export function TimeWithoutSpendingChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [time, setTime] = useState(levelBuilder.challengeManager.timeWithoutSpending);

    useEffect(() => {
        levelBuilder.challengeManager.timeWithoutSpending = time;
    }, [time]);

    return <NumberChallenge label="Time Without Spending" value={time} onChange={setTime} />;
}

export function FlowerLineChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const updateGrid = gridState((s) => s.updateGrid);
    const [distance, setDistance] = useState(levelBuilder.challengeManager.zombieDistance);

    useEffect(() => {
        levelBuilder.challengeManager.zombieDistance = distance;
        updateGrid();
    }, [distance]);

    return <NumberChallenge label="Flower Line Column" value={distance} onChange={setDistance} />;
}
