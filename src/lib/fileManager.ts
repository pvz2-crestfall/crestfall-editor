import type { LevelDefinitionObject } from '@/types/PVZTypes';
import type { PVZObject } from '../types/PVZTypes';
import { LevelBuilder } from './levelBuilder';

export async function saveLevel(levelBuilder: LevelBuilder) {
    const data = {
        objects: levelBuilder.build(),
        version: 1,
    };

    const json = JSON.stringify(data, null, 4);
    const defaultName = 'level.json';

    // modern save dialogue
    if ('showSaveFilePicker' in window) {
        try {
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: defaultName,
                types: [
                    {
                        description: 'JSON Files',
                        accept: { 'application/json': ['.json'] },
                    },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(json);
            await writable.close();

            return; // done
        } catch (err) {
            // @ts-ignore
            if (err.name == 'AbortError') return;
        }
    }

    // fallback
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'level.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Load grid JSON from a file input element
export function loadLevelFile(file: File, setBuilder: (levelBuilder: LevelBuilder) => void) {
    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target?.result as string);
            const objects: PVZObject[] = data['objects'].map((obj: unknown) => obj as PVZObject);

            const levelData = objects.filter((obj) => obj.objclass == 'LevelDefinition')[0]
                .objdata as LevelDefinitionObject;

            setBuilder(new LevelBuilder(objects));

            console.log('Loaded level data:', levelData);
        } catch (err) {
            alert('Failed to load JSON ' + err);
        }
    };
    reader.readAsText(file);
}

export const DefaultLevelFile = `
{
    "objects": [
        {
            "objclass": "LevelDefinition",
            "objdata": {
                "Name": "[EGYPT_LEVEL_NAME]",
                "Description": "[PLAYERS_TRIP_TO_EGYPT]",
                "LevelNumber": 1,
                "Loot": "RTID(DefaultLoot@LevelModules)",
                "StageModule": "RTID(EgyptStage@LevelModules)",
                "NormalPresentTable": "egypt_normal_01",
                "ShinyPresentTable": "egypt_shiny_01",
                "Modules": [
                    "RTID(StandardIntro@LevelModules)",
                    "RTID(ZombiesDeadWinCon@LevelModules)",
                    "RTID(DefaultZombieWinCondition@LevelModules)",
                    "RTID(SeedBank@CurrentLevel)",
                    "RTID(ChallengeModule@CurrentLevel)",
                    "RTID(NewWaves@CurrentLevel)",
                    "RTID(DefaultSunDropper@LevelModules)",
                    "RTID(EgyptMowers@LevelModules)"
                ],
                "StartingSun": 50,
                "AddBonusStartingSun": true
            }
        },
        {
            "aliases": [
                "SeedBank"
            ],
            "objclass": "SeedBankProperties",
            "objdata": {
                "SelectionMethod": "chooser"
            }
        },
        {
            "aliases": [
                "WaveManagerProps"
            ],
            "objclass": "WaveManagerProperties",
            "objdata": {
                "FlagWaveInterval": 0,
                "WaveCount": 0,
                "Waves": []
            }
        },
        {
            "aliases": [
                "NewWaves"
            ],
            "objclass": "WaveManagerModuleProperties",
            "objdata": {
                "WaveManagerProps": "RTID(WaveManagerProps@CurrentLevel)"
            }
        }
    ],
    "version": 1
}`;
