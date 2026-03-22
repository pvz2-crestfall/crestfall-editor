import { LevelInfo } from './general/level-info/level-info';
import { SunSettingsComponent } from './general/sun/sun-settings';
import { SeedChooserSettingsComponent } from './general/seedbank/seed-chooser-settings';
import { WorldInfo } from './general/world-options/world-info';

export function SidepanelGeneralTab() {
    return (
        <div className="flex flex-col gap-1">
            <WorldInfo />
            <LevelInfo />
            <SunSettingsComponent />
            <SeedChooserSettingsComponent />
        </div>
    );
}
