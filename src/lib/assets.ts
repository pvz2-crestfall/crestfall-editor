import type { StageModuleType } from '@/types/PVZTypes';
import { defaultGrave } from './levelModules/tilemanager/types';
import { PortalTypes, ModernPortalType } from './levelModules/wavemanager/types';

export const GravestoneImages = import.meta.glob('/assets/gravestones/*.png', {
    base: '/assets/gravestones/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const PortalImages = import.meta.glob('/assets/portals/*.png', {
    base: '/assets/portals/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const TileImages = import.meta.glob('/assets/tiles/*.png', {
    base: '/assets/tiles/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const PlantImages = import.meta.glob('/assets/plants/*.png', {
    base: '/assets/plants/',
    eager: true,
    import: 'default',
}) as Record<string, string>;

export function getGravestoneImage(stageType: StageModuleType, variant: string | undefined) {
    if (variant == 'default' || variant == undefined) {
        variant = defaultGrave[stageType];
    }

    return GravestoneImages[`./${variant}.png`] ?? GravestoneImages[`./gravestone_unknown.png`];
}

export function getPortalImage(variant: string | undefined) {
    if (variant == 'default' || variant == undefined) variant = 'blank';
    if (variant == 'outline') return PortalImages[`./portal_outline.png`];

    const portalImage = PortalTypes[variant as ModernPortalType] ?? 'modern';
    return PortalImages[`./portal_${portalImage}.png`] ?? PortalImages[`./portal_blank.png`];
}

export function getPlantImage(plant: string) {
    const plantImage = PlantImages[`./${plant}.png`] ?? PlantImages['./unknown_plant.png'];

    return plantImage;
}
