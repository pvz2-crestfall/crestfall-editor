import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { levelState } from '@/lib/state/levelstate';
import { useEffect, useState } from 'react';

export function BeatTheLevelChallenge() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const [name, setName] = useState(levelBuilder.challengeManager.customMessage?.name);
    const [description, setDescription] = useState(levelBuilder.challengeManager.customMessage?.description);

    useEffect(() => {
        if (!name && !description) {
            levelBuilder.challengeManager.customMessage = undefined;
            return;
        }

        levelBuilder.challengeManager.customMessage = {
            name: name ?? '',
            description: description ?? '',
        };
    }, [name, description]);

    return (
        <div className="w-full py-2 items-center justify-between flex flex-col">
            <Label className='pb-2'>Custom Challenge Message</Label>
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Name</Label>
                <Input
                    className="text-center"
                    value={name}
                    placeholder="Text"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="flex flex-col w-full items-center justify-between border rounded-md px-4 py-2 gap-2">
                <Label>Description</Label>
                <Input
                    className="text-center"
                    value={description}
                    placeholder="Text"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
