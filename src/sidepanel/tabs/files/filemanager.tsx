import { Button } from '@/components/ui/button';
import { loadLevelFile, saveLevel } from '@/lib/fileManager';
import { levelState } from '@/lib/state/levelstate';

export function exportAndImportTab() {
    const levelBuilder = levelState((s) => s.levelBuilder);
    const setBuilder = levelState((s) => s.setBuilder);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-2">File</h2>
            <Button onClick={() => saveLevel(levelBuilder)}>💾 Save Level</Button>
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
                    📂 Load Level
                </div>
            </label>
        </div>
    );
}
