import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TabSwitch } from '@/components/ui/tabswitcher';

export function ConveyorLevelModule() {
    return (
        <Card className="py-4 h-full">
            <CardTitle className="flex items-center justify-center">Title Placeholder</CardTitle>
            <CardContent className="flex flex-col">
                <TabSwitch
                    tabs={[
                        { label: 'Options', content: <p>Testicle</p> },
                        { label: 'Plants', content: <p>second testicle</p> },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
