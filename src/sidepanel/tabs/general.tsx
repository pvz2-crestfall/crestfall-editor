import { WorldTypeSelector } from './general/worldtype/world-type-selector';
import { SunSettingsComponent } from './general/sun/sun-settings';
import { SeedChooserSettingsComponent } from './general/seedbank/seed-chooser-settings';

export function SidepanelGeneralTab() {
    return (
        <div className="flex flex-col gap-1">
            <WorldTypeSelector />
            <SunSettingsComponent />
            <SeedChooserSettingsComponent />
        </div>
    );
}
