import React from 'react';
import Svg, { G, Polygon, Rect, Text as SvgText } from 'react-native-svg';
import {
  Bear,
  BullHead,
  CantonLabel,
  Cross,
  Crozier,
  Eagle,
  Fasces,
  Ibex,
  KeyShape,
  Lion,
  Ram,
  SaintFigure,
  Star,
} from './flagPrimitives';
import { CantonId } from '../data/cantons';

const RED = '#DA291C';
const WHITE = '#FFFFFF';
const BLACK = '#111111';
const YELLOW = '#FFD500';
const GOLD = '#F4C430';
const BLUE = '#1E5FAE';
const SKYBLUE = '#4FA6DC';
const GREEN = '#2E8B47';

const FRAME = '#00000028';

type FlagProps = { size?: number };
const wrap = (children: React.ReactNode, size = 64) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {children}
    <Rect x={1} y={1} width={98} height={98} rx={4} fill="none" stroke={FRAME} strokeWidth={3} />
  </Svg>
);

export const Flag_ZH: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Polygon points="0,0 0,100 100,100" fill={SKYBLUE} />
    </>,
    size
  );

export const Flag_BE: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={RED} />
      <Polygon points="-5,105 105,-5 105,20 20,105" fill={GOLD} />
      <G rotation={-45} originX={50} originY={50}>
        <Bear cx={50} cy={52} scale={1.55} color={BLACK} />
      </G>
    </>,
    size
  );

export const Flag_LU: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={50} fill={WHITE} />
      <Rect y={50} width={100} height={50} fill={BLUE} />
    </>,
    size
  );

export const Flag_UR: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={YELLOW} />
      <BullHead cx={50} cy={53} scale={1.9} color={BLACK} accent={RED} />
    </>,
    size
  );

export const Flag_SZ: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={RED} />
      <Cross x={20} y={20} size={16} color={WHITE} />
    </>,
    size
  );

export const Flag_OW: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={50} fill={RED} />
      <Rect y={50} width={100} height={50} fill={WHITE} />
      <KeyShape cx={50} cy={38} scale={1.15} color={WHITE} rotation={90} />
      <KeyShape cx={50} cy={62} scale={1.15} color={RED} rotation={90} />
    </>,
    size
  );

export const Flag_NW: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={RED} />
      <KeyShape cx={50} cy={62} scale={1.9} color={WHITE} rotation={180} />
    </>,
    size
  );

export const Flag_GL: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={RED} />
      <SaintFigure cx={50} cy={72} scale={1.55} />
    </>,
    size
  );

export const Flag_ZG: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Rect y={37} width={100} height={26} fill={BLUE} />
    </>,
    size
  );

export const Flag_FR: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={50} fill={BLACK} />
      <Rect y={50} width={100} height={50} fill={WHITE} />
    </>,
    size
  );

export const Flag_SO: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={50} fill={RED} />
      <Rect y={50} width={100} height={50} fill={WHITE} />
    </>,
    size
  );

export const Flag_BS: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Crozier cx={50} cy={52} scale={1.05} color={BLACK} mirror />
    </>,
    size
  );

export const Flag_BL: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Crozier cx={50} cy={52} scale={1.05} color={RED} />
    </>,
    size
  );

export const Flag_SH: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={YELLOW} />
      <Ram cx={50} cy={54} scale={1.9} color={BLACK} accent={RED} />
    </>,
    size
  );

export const Flag_AR: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Bear cx={50} cy={62} scale={1.55} color={BLACK} standing />
      <CantonLabel x={22} y={58} text="A" color={BLACK} size={16} />
      <CantonLabel x={78} y={58} text="R" color={BLACK} size={16} />
    </>,
    size
  );

export const Flag_AI: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Bear cx={50} cy={64} scale={2.1} color={BLACK} standing />
    </>,
    size
  );

export const Flag_SG: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={GREEN} />
      <Fasces cx={48} cy={55} scale={1.15} color={WHITE} outline={BLACK} />
    </>,
    size
  );

export const Flag_GR: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Rect x={0} y={0} width={25} height={50} fill={BLACK} />
      <Rect x={25} y={0} width={25} height={50} fill={WHITE} />
      <Rect x={50} y={0} width={50} height={50} fill={BLUE} />
      <Cross x={75} y={25} size={20} color={GOLD} />
      <Ibex cx={50} cy={76} scale={1.5} color={BLACK} />
    </>,
    size
  );

export const Flag_AG: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={50} height={100} fill={BLACK} />
      <Rect x={50} width={50} height={100} fill={BLUE} />
      <Rect x={0} y={45} width={50} height={10} fill={WHITE} />
      <Star cx={75} cy={30} r={8} color={WHITE} />
      <Star cx={75} cy={50} r={8} color={WHITE} />
      <Star cx={75} cy={70} r={8} color={WHITE} />
    </>,
    size
  );

export const Flag_TG: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={100} fill={WHITE} />
      <Polygon points="0,0 100,0 100,100" fill={GREEN} />
      <Lion cx={68} cy={30} scale={0.85} color={GOLD} />
      <Lion cx={32} cy={70} scale={0.85} color={GOLD} />
    </>,
    size
  );

export const Flag_TI: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={50} fill={RED} />
      <Rect y={50} width={100} height={50} fill={BLUE} />
    </>,
    size
  );

export const Flag_VD: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={100} height={50} fill={WHITE} />
      <Rect y={50} width={100} height={50} fill={GREEN} />
      <SvgText x={50} y={30} fontSize={8.5} fontWeight="bold" fill={GOLD} textAnchor="middle">
        LIBERTE
      </SvgText>
      <SvgText x={50} y={42} fontSize={8.5} fontWeight="bold" fill={GOLD} textAnchor="middle">
        ET PATRIE
      </SvgText>
    </>,
    size
  );

export const Flag_VS: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={50} height={100} fill={RED} />
      <Rect x={50} width={50} height={100} fill={WHITE} />
      {[8, 22, 36, 50, 64, 78, 92].map((cx, i) => (
        <Star key={`s${i}`} cx={cx} cy={38} r={7} color={cx < 50 ? WHITE : RED} />
      ))}
      {[15, 29, 43, 57, 71, 85].map((cx, i) => (
        <Star key={`s2${i}`} cx={cx} cy={62} r={7} color={cx < 50 ? WHITE : RED} />
      ))}
    </>,
    size
  );

export const Flag_NE: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={34} height={100} fill={GREEN} />
      <Rect x={34} width={33} height={100} fill={WHITE} />
      <Rect x={67} width={33} height={100} fill={RED} />
      <Cross x={50} y={18} size={13} color={WHITE} />
    </>,
    size
  );

export const Flag_GE: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={50} height={100} fill={YELLOW} />
      <Rect x={50} width={50} height={100} fill={RED} />
      <Eagle cx={30} cy={48} scale={1.45} color={BLACK} accent={RED} />
      <KeyShape cx={70} cy={55} scale={1.5} color={GOLD} rotation={35} />
    </>,
    size
  );

export const Flag_JU: React.FC<FlagProps> = ({ size }) =>
  wrap(
    <>
      <Rect width={50} height={100} fill={WHITE} />
      <Rect x={50} width={50} height={100} fill={RED} />
      <Crozier cx={30} cy={52} scale={0.85} color={RED} mirror />
      {[18, 30, 42, 54, 66, 78, 90].map((y, i) => (
        <Rect key={i} x={54} y={y} width={40} height={4} fill={WHITE} />
      ))}
    </>,
    size
  );

export const CANTON_FLAGS: Record<CantonId, React.FC<FlagProps>> = {
  ZH: Flag_ZH,
  BE: Flag_BE,
  LU: Flag_LU,
  UR: Flag_UR,
  SZ: Flag_SZ,
  OW: Flag_OW,
  NW: Flag_NW,
  GL: Flag_GL,
  ZG: Flag_ZG,
  FR: Flag_FR,
  SO: Flag_SO,
  BS: Flag_BS,
  BL: Flag_BL,
  SH: Flag_SH,
  AR: Flag_AR,
  AI: Flag_AI,
  SG: Flag_SG,
  GR: Flag_GR,
  AG: Flag_AG,
  TG: Flag_TG,
  TI: Flag_TI,
  VD: Flag_VD,
  VS: Flag_VS,
  NE: Flag_NE,
  GE: Flag_GE,
  JU: Flag_JU,
};

export const CantonFlag: React.FC<{ id: CantonId; size?: number }> = ({ id, size = 64 }) => {
  const Comp = CANTON_FLAGS[id];
  return <Comp size={size} />;
};
