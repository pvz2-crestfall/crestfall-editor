import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function SunBombsChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const [enabled, setEnabled] = useState(levelBuilder.minigameManager.sunbombs.enabled);

    const [plantDamage, setPlantDamage] = useState(levelBuilder.minigameManager.sunbombs.plantDamage);
    const [plantRadius, setPlantRadius] = useState(levelBuilder.minigameManager.sunbombs.plantRadius);

    const [zombieDamage, setZombieDamage] = useState(levelBuilder.minigameManager.sunbombs.zombieDamage);
    const [zombieRadius, setZombieRadius] = useState(levelBuilder.minigameManager.sunbombs.zombieRadius);

    useEffect(() => {
        levelBuilder.minigameManager.sunbombs.plantDamage = plantDamage;
        levelBuilder.minigameManager.sunbombs.plantRadius = plantRadius;
        levelBuilder.minigameManager.sunbombs.zombieDamage = zombieDamage;
        levelBuilder.minigameManager.sunbombs.zombieRadius = zombieRadius;

        levelBuilder.minigameManager.sunbombs.enabled = enabled;
    }, [plantDamage, plantRadius, zombieDamage, zombieRadius, enabled]);

    return (
        <>
            <div className="flex items-center justify-center border rounded-md px-4 py-2">
                <Label className="px-4 py-1">Enable Sunbombs</Label>
                <Switch defaultChecked={enabled} onCheckedChange={setEnabled}></Switch>
            </div>
            {enabled && (
                <>
                    <div className="flex items-center flex-col justify-center border rounded-md px-4 py-2">
                        <Label className="pb-2">Effect on Plants</Label>
                        <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                            <Label>Explosion Damage</Label>
                            <Input
                                type="number"
                                defaultValue={plantDamage}
                                className="text-center w-20 font-mono align-left"
                                size={5}
                                onChange={(e) => setPlantDamage(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                            <Label>Explosion Radius</Label>
                            <Input
                                type="number"
                                defaultValue={plantRadius}
                                className="text-center w-20 font-mono align-left"
                                size={5}
                                onChange={(e) => setPlantRadius(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="flex items-center flex-col justify-center border rounded-md px-4 py-2">
                        <Label className="pb-2">Effect on Zombies</Label>
                        <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                            <Label>Explosion Damage</Label>
                            <Input
                                type="number"
                                defaultValue={zombieDamage}
                                className="text-center w-20 font-mono align-left"
                                size={5}
                                onChange={(e) => setZombieDamage(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-row w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                            <Label>Explosion Radius</Label>
                            <Input
                                type="number"
                                defaultValue={zombieRadius}
                                className="text-center w-20 font-mono align-left"
                                size={5}
                                onChange={(e) => setZombieRadius(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
