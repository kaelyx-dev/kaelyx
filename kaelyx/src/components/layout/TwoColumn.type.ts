export const classPrefix = 'layout__two-column';

export interface TwoColumnProps {
    leftTopOnMobile?: boolean;
    rightTopOnMobile?: boolean;
}

export interface TwoColumnSlots {
  left: (_?: any) => any;
  right: (_?: any) => any;
}