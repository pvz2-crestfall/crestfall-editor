import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TabSwitch } from '@/components/ui/tabswitcher';
import { GravestoneEditor } from './gravestone-editor';

export function GraveStonesModule() {
    return (
        <Card className="py-4 h-full">
            <CardTitle className="flex items-center justify-center">Gravestones Module</CardTitle>
            <CardContent className="flex flex-col">
                <TabSwitch
                    tabs={[
                        { label: 'Initial Graves', content: <GravestoneEditor /> },
                        { label: 'Dynamic Graves', content: <p>Not implemented</p> },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
