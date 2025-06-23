import { Image } from 'expo-image';

import CCTVIcon from '@/assets/icons/spaceDetail/facility/cctv.svg';
import ChairIcon from '@/assets/icons/spaceDetail/facility/chair.svg';
import CircleTableIcon from '@/assets/icons/spaceDetail/facility/circle-table.svg';
import CouchIcon from '@/assets/icons/spaceDetail/facility/couch.svg';
import DesktopIcon from '@/assets/icons/spaceDetail/facility/desktop.svg';
import DrinkIcon from '@/assets/icons/spaceDetail/facility/drink.svg';
import FireExtinguisherIcon from '@/assets/icons/spaceDetail/facility/fire-extinguisher.svg';
import FirealarmIcon from '@/assets/icons/spaceDetail/facility/firealarm.svg';
import FirstAidKitIcon from '@/assets/icons/spaceDetail/facility/first-aid-kit.svg';
import LightIcon from '@/assets/icons/spaceDetail/facility/light.svg';
import MonitorIcon from '@/assets/icons/spaceDetail/facility/monitor.svg';
import PrinterIcon from '@/assets/icons/spaceDetail/facility/printer.svg';
import ProjectorIcon from '@/assets/icons/spaceDetail/facility/projector.svg';
import ShelfIcon from '@/assets/icons/spaceDetail/facility/shelf.svg';
import SpeakerIcon from '@/assets/icons/spaceDetail/facility/speaker.svg';
import SquareTableIcon from '@/assets/icons/spaceDetail/facility/square-table.svg';
import StandingTableIcon from '@/assets/icons/spaceDetail/facility/standing-table.svg';
import TvIcon from '@/assets/icons/spaceDetail/facility/tv.svg';
import WaterPurifierIcon from '@/assets/icons/spaceDetail/facility/water-purifier.svg';
import WifiIcon from '@/assets/icons/spaceDetail/facility/wifi.svg';

export default function renderFacilityIcon(name: string) {
  switch (name) {
    case 'cctv':
      return <CCTVIcon />;
    case 'chair':
      return <ChairIcon />;
    case 'circle-table':
      return <CircleTableIcon />;
    case 'couch':
      return <CouchIcon />;
    case 'desktop':
      return <DesktopIcon />;
    case 'drink':
      return <DrinkIcon />;
    case 'fire-extinguisher':
      return <FireExtinguisherIcon />;
    case 'firealarm':
      return <FirealarmIcon />;
    case 'first-aid-kit':
      return <FirstAidKitIcon />;
    case 'light':
      return <LightIcon />;
    case 'monitor':
      return <MonitorIcon />;
    case 'printer':
      return <PrinterIcon />;
    case 'projector':
      return <ProjectorIcon />;
    case 'shelf':
      return <ShelfIcon />;
    case 'speaker':
      return <SpeakerIcon />;
    case 'square-table':
      return <SquareTableIcon />;
    case 'standing-table':
      return <StandingTableIcon />;
    case 'tv':
      return <TvIcon />;
    case 'water-purifier':
      return <WaterPurifierIcon />;
    case 'wifi':
      return <WifiIcon />;
    default:
      return null;
  }
}
