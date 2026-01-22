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
    case 'circleTable':
      return <CircleTableIcon />;
    case 'couch':
      return <CouchIcon />;
    case 'desktop':
      return <DesktopIcon />;
    case 'drink':
      return <DrinkIcon />;
    case 'fireExtinguisher':
    case 'fire-extinguisher':
      return <FireExtinguisherIcon />;
    case 'fireAlarm':
    case 'firealarm':
    case 'fire-alarm':
      return <FirealarmIcon />;
    case 'firstAidKit':
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
    case 'squareTable':
    case 'square-table':
      return <SquareTableIcon />;
    case 'standingTable':
    case 'standing-table':
      return <StandingTableIcon />;
    case 'tv':
      return <TvIcon />;
    case 'waterPurifier':
    case 'water-purifier':
      return <WaterPurifierIcon />;
    case 'wifi':
      return <WifiIcon />;
    default:
      return null;
  }
}

export function getFacilityLabel(name: string, number?: number): string {
  // 기존 하이픈 형식도 camelCase로 변환
  const normalizedName = name
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^firealarm$/, 'fireAlarm');

  switch (normalizedName) {
    case 'cctv':
      return 'CCTV';
    case 'chair':
      return `의자 ${number ?? 0}개`;
    case 'circleTable':
      return `원형테이블 ${number ?? 0}개`;
    case 'couch':
      return `쇼파 ${number ?? 0}개`;
    case 'desktop':
      return `데스크탑 ${number ?? 0}개`;
    case 'drink':
      return `음료수 보관대 ${number ?? 0}개`;
    case 'fireExtinguisher':
      return `소화기 ${number ?? 0}개`;
    case 'fireAlarm':
      return '화재경보기';
    case 'firstAidKit':
      return '구급 상자';
    case 'light':
      return '공간별 조명 밝기 조절 가능';
    case 'monitor':
      return `모니터 ${number ?? 0}개`;
    case 'printer':
      return `프린터·복사기 ${number ?? 0}개`;
    case 'projector':
      return `빔프로젝터 ${number ?? 0}개`;
    case 'shelf':
      return `진열대 ${number ?? 0}개`;
    case 'speaker':
      return `스피커 ${number ?? 0}개`;
    case 'squareTable':
      return `사각테이블 ${number ?? 0}개`;
    case 'standingTable':
      return `스탠딩테이블 ${number ?? 0}개`;
    case 'tv':
      return `TV ${number ?? 0}개`;
    case 'waterPurifier':
      return `정수기 ${number ?? 0}개`;
    case 'wifi':
      return 'Wi-fi';
    default:
      return '';
  }
}
