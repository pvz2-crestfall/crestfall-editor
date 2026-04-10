import { Button } from '@/components/ui/button';
import { loadLevelFile, saveLevel, type SaveEntry } from '@/lib/fileManager';
import { levelState } from '@/lib/state/levelstate';
import { SaveList } from './save-list';
import { FileSaveButton } from './save-button';
import { useEffect, useState } from 'react';
import { LevelBuilder } from '@/lib/levelBuilder';
import { Label } from '@/components/ui/label';

export function exportAndImportTab() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const setBuilder = levelState((s) => s.setBuilder);

    const [autosaves, setAutosaves] = useState<SaveEntry[]>([]);
    const [manualSaves, setManualSaves] = useState<SaveEntry[]>([]);

    const refreshSaveData = () => {
        const autoRaw = localStorage.getItem('autosave-history');
        const manualRaw = localStorage.getItem('manual-saves');

        if (autoRaw) setAutosaves(JSON.parse(autoRaw));
        if (manualRaw) setManualSaves(JSON.parse(manualRaw));
    };

    useEffect(() => {
        refreshSaveData();
    }, []);

    const loadSave = (save: SaveEntry) => {
        if (!window.confirm('Load this save? Unsaved changes will be lost.')) return;
        setBuilder(new LevelBuilder(save.objects));
    };

    const deleteAutosave = (index: number) => {
        const updated = [...autosaves];
        updated.splice(index, 1);
        setAutosaves(updated);
        localStorage.setItem('autosave-history', JSON.stringify(updated));
    };

    const deleteManual = (index: number) => {
        const updated = [...manualSaves];
        updated.splice(index, 1);
        setManualSaves(updated);
        localStorage.setItem('manual-saves', JSON.stringify(updated));
    };

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">File</h2>
            <Button onClick={() => saveLevel(levelBuilder)}>💾 Export Level</Button>
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) loadLevelFile(file, setBuilder);
                    }}
                />

                <div className="flex items-center justify-center p-2 border rounded-md hover:bg-primary/10 transition">
                    📂 Import Level
                </div>
            </label>

            <div className="flex flex-col w-full gap-2 items-center justify-center border rounded-md px-4 py-2">
                <Label>Save List</Label>

                <div className="flex flex-col w-full rounded-md px-4">
                    <SaveList saves={manualSaves} onLoad={loadSave} onDelete={deleteManual} />
                </div>
                <div className="flex flex-col w-full gap-2 rounded-md px-4 pb-2">
                    <FileSaveButton onSave={refreshSaveData} />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full items-center justify-center border rounded-md px-4 py-2">
                <Label>Autosave History</Label>

                <div className="flex flex-col justify-center w-full rounded-md px-4 py-2">
                    <SaveList saves={autosaves} onLoad={loadSave} onDelete={deleteAutosave} />
                </div>
            </div>
        </div>
    );
}
