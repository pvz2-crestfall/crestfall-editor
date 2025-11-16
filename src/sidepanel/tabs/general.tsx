import { LevelInfo } from './general/level-info/level-info';
import { SunSettingsComponent } from './general/sun/sun-settings';
import { SeedChooserSettingsComponent } from './general/seedbank/seed-chooser-settings';

export function SidepanelGeneralTab() {
    return (
        <div className="flex flex-col gap-1">
            <LevelInfo />
            <SunSettingsComponent />
            <SeedChooserSettingsComponent />
        </div>
    );
}
