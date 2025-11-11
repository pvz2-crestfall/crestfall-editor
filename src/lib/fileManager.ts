import type { LevelDefinitionObject } from '@/types/PVZTypes';
import type { PVZObject } from '../types/PVZTypes';
import { levelState } from './state';
import { LevelBuilder } from './levelBuilder';

// Save grid as a downloadable JSON file
export function saveLevel() {
    const levelBuilder = levelState((s) => s.levelBuilder);

    const data = {
        objects: levelBuilder.build(),
        version: 1,
    };
    const json = JSON.stringify(data, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'level.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Load grid JSON from a file input element
export function loadLevelFile(file: File) {
    const setBuilder = levelState((s) => s.setBuilder);

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
