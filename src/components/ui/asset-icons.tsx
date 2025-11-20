import { GravestoneImages, PlantImages, PortalImages } from '@/lib/assets';
import { ModernPortalType, PortalTypes } from '@/lib/levelModules/wavemanager/types';

export function iconFromList({
    icons,
    type,
    size = 5,
    fallback,
}: {
    icons: Record<string, string>;
    type: string;
    size?: number;
    fallback?: string;
}) {
    const src = icons[`./${type}.png`];
    const fallbackSrc = icons[`./${fallback}.png`];
    const imageSrc = src || fallbackSrc;

    return (
        <div
            style={{
                width: `calc(var(--spacing) * ${size})`,
                height: `calc(var(--spacing) * ${size})`,
                objectFit: 'contain',
            }}
        >
            <img
                src={imageSrc}
                className="h-full w-full object-contain"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallbackSrc ?? '';
                }}
            />
        </div>
    );
}

export type StandardIconProps = {
    type: string;
    size?: number;
};

export function GravestoneIcon(props: StandardIconProps) {
    return iconFromList({ icons: GravestoneImages, fallback: 'gravestone_unknown', ...props });
}

export function PlantIcon(props: StandardIconProps) {
    return iconFromList({ icons: PlantImages, fallback: 'unknown_plant', ...props });
}

export function PortalIcon({ size = 5, type }: StandardIconProps) {
    if (type == 'default' || type == undefined) type = 'blank';
    if (type == 'outline') type = 'portal_outline.png';

    const portalType = PortalTypes[type as ModernPortalType] ?? 'modern';
    return iconFromList({ icons: PortalImages, fallback: 'portal_blank', type: 'portal_' + portalType, size });
}
