"use client";

import dynamic from 'next/dynamic'
import MapDistance from "@/components/MapDistance/MapDistance";
import { RootState, useAppSelector } from "@/redux/store";
import PinCreationWindow from "./PinCreationWindow";
import MapToolsTab from "./MapToolsTab";
import LocationListenerToggle from '@/components/LocationListenerToggle/LocationListenerToggle';
import MapThemeSwitcher from '@/components/MapThemeSwitch/MapThemeSwitch';

const Map = dynamic(
    () => import('../components/Map/MapItem'),
    { ssr: false }
)

export default function MapLayout(){
    const pinCreationToggleWindow = useAppSelector((state:RootState) => state.pinCreationData.windowToggle);

    return (
        <div className='w-screen max-w-[850px] h-screen max-h-[750px] flex flex-col items-center border-[#4B99E6] border-2 relative'>
            <MapToolsTab />
            <Map />
            <MapDistance/>
            <LocationListenerToggle />
            <MapThemeSwitcher />
            {pinCreationToggleWindow && <PinCreationWindow />}
        </div>
            
    )
}