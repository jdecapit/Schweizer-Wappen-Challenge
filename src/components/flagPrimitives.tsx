import React from 'react';
import { Circle, Ellipse, G, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';

export function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(' ');
}

export const Star: React.FC<{ cx: number; cy: number; r: number; color: string; rotation?: number }> = ({
  cx,
  cy,
  r,
  color,
  rotation = 0,
}) => {
  const star = <Polygon points={starPoints(cx, cy, r, r * 0.42)} fill={color} />;
  if (!rotation) return star;
  return (
    <G rotation={rotation} originX={cx} originY={cy}>
      {star}
    </G>
  );
};

export const Cross: React.FC<{ x: number; y: number; size: number; color: string }> = ({ x, y, size, color }) => {
  const w = size * 0.32;
  const l = size;
  return (
    <G>
      <Rect x={x - l / 2} y={y - w / 2} width={l} height={w} fill={color} />
      <Rect x={x - w / 2} y={y - l / 2} width={w} height={l} fill={color} />
    </G>
  );
};

export const KeyShape: React.FC<{ cx: number; cy: number; scale?: number; color: string; rotation?: number }> = ({
  cx,
  cy,
  scale = 1,
  color,
  rotation = 0,
}) => (
  <G transform={`translate(${cx} ${cy}) rotate(${rotation}) scale(${scale})`}>
    <Circle cx={0} cy={-15} r={6.5} stroke={color} strokeWidth={3.4} fill="none" />
    <Rect x={-2} y={-9} width={4} height={22} fill={color} />
    <Rect x={-2} y={9} width={9} height={3.4} fill={color} />
    <Rect x={-2} y={14.5} width={6.5} height={3.4} fill={color} />
  </G>
);

export const Crozier: React.FC<{ cx: number; cy: number; scale?: number; color: string; mirror?: boolean }> = ({
  cx,
  cy,
  scale = 1,
  color,
  mirror = false,
}) => (
  <G transform={`translate(${cx} ${cy}) scale(${mirror ? -1 : 1} 1) scale(${scale})`}>
    <Rect x={-1.8} y={-22} width={3.6} height={44} fill={color} />
    <Path
      d="M -1.8 -22 C -1.8 -33, 11 -34, 11 -23 C 11 -14, -1.8 -13, -1.8 -20"
      stroke={color}
      strokeWidth={3.6}
      fill="none"
      strokeLinecap="round"
    />
  </G>
);

export const Bear: React.FC<{ cx: number; cy: number; scale?: number; color: string; standing?: boolean }> = ({
  cx,
  cy,
  scale = 1,
  color,
  standing = false,
}) => {
  if (standing) {
    return (
      <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
        <Ellipse cx={0} cy={-1} rx={9.5} ry={13.5} fill={color} />
        <Circle cx={0} cy={-19} r={7.5} fill={color} />
        <Circle cx={-6} cy={-25.5} r={3} fill={color} />
        <Circle cx={6} cy={-25.5} r={3} fill={color} />
        <Ellipse cx={-10.5} cy={-6} rx={3.2} ry={8} fill={color} />
        <Ellipse cx={10.5} cy={-6} rx={3.2} ry={8} fill={color} />
        <Ellipse cx={-5.5} cy={13} rx={4} ry={7} fill={color} />
        <Ellipse cx={5.5} cy={13} rx={4} ry={7} fill={color} />
      </G>
    );
  }
  return (
    <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <Ellipse cx={0} cy={2} rx={16} ry={9} fill={color} />
      <Circle cx={17} cy={-5} r={7} fill={color} />
      <Circle cx={13} cy={-11.5} r={2.6} fill={color} />
      <Ellipse cx={-12} cy={9.5} rx={3.2} ry={6} fill={color} />
      <Ellipse cx={9.5} cy={9.5} rx={3.2} ry={6} fill={color} />
    </G>
  );
};

export const BullHead: React.FC<{ cx: number; cy: number; scale?: number; color: string; accent: string }> = ({
  cx,
  cy,
  scale = 1,
  color,
  accent,
}) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <Circle cx={0} cy={0} r={13} fill={color} />
    <Ellipse cx={0} cy={11} rx={6} ry={3.4} fill={color} />
    <Path d="M -13 -6 C -20 -12, -20 -20, -13 -18" stroke={color} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    <Path d="M 13 -6 C 20 -12, 20 -20, 13 -18" stroke={color} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    <Circle cx={-5} cy={-2} r={1.8} fill={accent} />
    <Circle cx={5} cy={-2} r={1.8} fill={accent} />
    <Ellipse cx={0} cy={8} rx={2.6} ry={1.6} fill={accent} />
    <Path d="M -3 12 Q 0 16 3 12" stroke={accent} strokeWidth={1.8} fill="none" strokeLinecap="round" />
  </G>
);

export const Ram: React.FC<{ cx: number; cy: number; scale?: number; color: string; accent: string }> = ({
  cx,
  cy,
  scale = 1,
  color,
  accent,
}) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <Ellipse cx={0} cy={2} rx={14} ry={9} fill={color} />
    <Circle cx={14} cy={-6} r={6.5} fill={color} />
    <Path d="M 10 -10 C 4 -13, 3 -20, 9 -22" stroke={color} strokeWidth={2.6} fill="none" strokeLinecap="round" />
    <Ellipse cx={-10} cy={9} rx={3} ry={6} fill={color} />
    <Ellipse cx={8} cy={10} rx={3} ry={6} fill={color} />
    <Circle cx={16} cy={-7} r={1.4} fill={accent} />
    <Path d="M 6 -3 Q 0 2 -6 -1" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
  </G>
);

export const Lion: React.FC<{ cx: number; cy: number; scale?: number; color: string }> = ({ cx, cy, scale = 1, color }) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <Ellipse cx={0} cy={2} rx={11} ry={6.5} fill={color} />
    <Circle cx={10} cy={-5} r={6} fill={color} />
    <Circle cx={10} cy={-5} r={8.6} fill="none" stroke={color} strokeWidth={1.6} strokeDasharray="2.2,2.2" />
    <Ellipse cx={-9} cy={7} rx={2.3} ry={4.6} fill={color} />
    <Ellipse cx={6} cy={7.5} rx={2.3} ry={4.6} fill={color} />
    <Path d="M -10 3 C -16 4, -17 -3, -12 -3" stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" />
  </G>
);

export const Ibex: React.FC<{ cx: number; cy: number; scale?: number; color: string }> = ({ cx, cy, scale = 1, color }) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <Ellipse cx={0} cy={3} rx={12} ry={6.5} fill={color} />
    <Circle cx={11} cy={-5} r={5.6} fill={color} />
    <Path d="M 13 -9 C 20 -18, 24 -24, 20 -28" stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    <Ellipse cx={-9} cy={8} rx={2.2} ry={5} fill={color} />
    <Ellipse cx={7} cy={8.5} rx={2.2} ry={5} fill={color} />
  </G>
);

export const Eagle: React.FC<{ cx: number; cy: number; scale?: number; color: string; accent: string }> = ({
  cx,
  cy,
  scale = 1,
  color,
  accent,
}) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <Path
      d="M 0 -18 C 8 -14, 10 -2, 4 6 C 10 8, 14 14, 8 20 L 0 16 L -2 6 C -6 -2, -6 -12, 0 -18 Z"
      fill={color}
    />
    <Path d="M 0 -14 C -6 -12, -14 -8, -18 0" stroke={color} strokeWidth={3.4} fill="none" strokeLinecap="round" />
    <Path d="M 0 -6 C -7 -4, -15 2, -18 10" stroke={color} strokeWidth={3.4} fill="none" strokeLinecap="round" />
    <Circle cx={2} cy={-16} r={2.6} fill={accent} />
    <Path d="M 4 -16 L 9 -15 L 4 -13 Z" fill={accent} />
  </G>
);

export const Fasces: React.FC<{ cx: number; cy: number; scale?: number; color: string; outline: string }> = ({
  cx,
  cy,
  scale = 1,
  color,
  outline,
}) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    {[-8, -4, 0, 4, 8].map((dx) => (
      <Rect key={dx} x={dx - 1.4} y={-20} width={2.8} height={38} fill={color} stroke={outline} strokeWidth={0.6} />
    ))}
    <Path d="M 8 -20 L 20 -26 L 20 -10 L 8 -14 Z" fill={color} stroke={outline} strokeWidth={0.6} />
    <Rect x={-11} y={-2} width={22} height={4} fill={outline} />
    <Rect x={-11} y={10} width={22} height={4} fill={outline} />
  </G>
);

export const SaintFigure: React.FC<{ cx: number; cy: number; scale?: number }> = ({ cx, cy, scale = 1 }) => (
  <G transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <Circle cx={4} cy={-24} r={5.4} fill="none" stroke="#F4C430" strokeWidth={2} />
    <Circle cx={2} cy={-16} r={5.2} fill="#FFFFFF" />
    <Path d="M -8 -10 C -8 4, -6 20, -6 20 L 10 20 C 10 20, 12 4, 10 -10 C 6 -14, -4 -14, -8 -10 Z" fill="#111111" />
    <Ellipse cx={-9} cy={-2} rx={2.6} ry={6} fill="#FFFFFF" />
    <Rect x={-13} y={-10} width={2} height={30} fill="#F4C430" />
  </G>
);

export const CantonLabel: React.FC<{ x: number; y: number; text: string; color: string; size?: number }> = ({
  x,
  y,
  text,
  color,
  size = 11,
}) => (
  <SvgText x={x} y={y} fontSize={size} fontWeight="bold" fill={color} textAnchor="middle">
    {text}
  </SvgText>
);
