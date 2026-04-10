import type { PVZObject } from '../types/PVZTypes';
import { LevelBuilder } from './levelBuilder';

export const MAX_AUTO_SAVES: number = 10;

export type SaveEntry = {
    timestamp: string;
    objects: any;
    name?: string;
};

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

            setBuilder(new LevelBuilder(objects));
        } catch (err) {
            alert('Failed to load JSON ' + err);
        }
    };
    reader.readAsText(file);
}

export function autosave(levelBuilder: LevelBuilder) {
    const data = {
        timestamp: Date.now(),
        objects: levelBuilder.build(),
        version: 1,
    };
    sessionStorage.setItem('session-project', JSON.stringify(data));

    let oldHistory = localStorage.getItem('autosave-history');
    let history = [];

    if (oldHistory != null) {
        let parsed = JSON.parse(oldHistory) as PVZObject[];
        history.push(...parsed.slice(0, MAX_AUTO_SAVES - 1));
    }

    history.unshift(data);
    localStorage.setItem('autosave-history', JSON.stringify(history));

    console.log('Autosaved.');
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
