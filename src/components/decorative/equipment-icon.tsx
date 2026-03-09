import { EQUIPMENT_ICONS } from '@/data/data';
import { Image, ImageBackground, StyleSheet } from 'react-native';

export function EquipmentIcon({ type, size }: { type: string, size: number }) {
    const ICON_BACKGROUND = require('@assets/ui_elements/icon_border.png')

    return <ImageBackground source={ICON_BACKGROUND} style={[style.icon_border, { width: size, height: size }]}>
        <Image source={EQUIPMENT_ICONS[type]} style={{ width: size - (size * 0.45), height: size - (size * 0.45) }} />
    </ImageBackground>
}

export const style = StyleSheet.create({
    icon_border: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})