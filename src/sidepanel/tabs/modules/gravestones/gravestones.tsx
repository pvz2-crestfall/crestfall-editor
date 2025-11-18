import { GravestoneEditor } from './gravestone-editor';
import { ModuleTemplate } from '../template';

export function GraveStonesModule() {
    return (
        <ModuleTemplate title="Gravestones Module">
            <GravestoneEditor />
        </ModuleTemplate>
    );
}
