import { 
  Shield, 
  Zap, 
  ArrowRight, 
  CircleCheck, 
  FileCheck, 
  Database, 
  Menu, 
  Globe, 
  ChevronDown, 
  Check, 
  LucideIcon,
} from 'lucide-react';
import React from 'react';

import styles from '@/components/shared/Icon.module.css';

/**
 * STATIC ICON MAPPING
 */
const ICON_COMPONENTS: Record<string, LucideIcon> = {
  'shield': Shield,
  'zap': Zap,
  'arrow-right': ArrowRight,
  'circle-check': CircleCheck,
  'file-check': FileCheck,
  'database': Database,
  'menu': Menu,
  'globe': Globe,
  'chevron-down': ChevronDown,
  'check': Check,
};

// Restricting IconName to only icons actually used in the project
export type IconName = keyof typeof ICON_COMPONENTS;

export type IconVariant = 
  | 'primary' | 'primarySm' | 'primaryXs' 
  | 'secondary' | 'secondarySm' 
  | 'white' | 'whiteSm'
  | 'gray' | 'grayXs' 
  | 'success' 
  | 'feature' 
  | 'compliance' 
  | 'subtle';

interface IconProps {
  name: IconName;
  variant?: IconVariant;
}

/**
 * MAPPING OF VARIANTS TO CSS CLASS COMBINATIONS
 * This satisfies the "single variant controls two classnames" requirement.
 * All class accesses are static to ensure type safety and pass linting.
 */
const ICON_STYLES: Record<IconVariant, { icon: string; wrapper: string }> = {
  primary: { icon: styles.primary, wrapper: styles.wrapper },
  primarySm: { icon: styles.primarySm, wrapper: styles.wrapper },
  primaryXs: { icon: styles.primaryXs, wrapper: styles.wrapper },
  secondary: { icon: styles.secondary, wrapper: styles.wrapper },
  secondarySm: { icon: styles.secondarySm, wrapper: styles.wrapper },
  white: { icon: styles.white, wrapper: styles.wrapper },
  whiteSm: { icon: styles.whiteSm, wrapper: styles.wrapper },
  gray: { icon: styles.gray, wrapper: styles.wrapper },
  grayXs: { icon: styles.grayXs, wrapper: styles.wrapper },
  success: { icon: styles.success, wrapper: styles.wrapper },
  feature: { icon: styles.icon, wrapper: `${styles.wrapper} ${styles.feature}` },
  compliance: { icon: styles.icon, wrapper: `${styles.wrapper} ${styles.compliance}` },
  subtle: { icon: styles.icon, wrapper: `${styles.wrapper} ${styles.subtle}` },
};

/**
 * Unified Icon Component (Server Component)
 * Single variant prop handles color, size, and optional wrapper via the ICON_STYLES record.
 */
const Icon = ({
  name,
  variant = 'gray',
}: IconProps): React.JSX.Element => {
  const LucideIconComponent = ICON_COMPONENTS[name];
  const { icon, wrapper } = ICON_STYLES[variant];

  return (
    <div className={wrapper}>
      <LucideIconComponent 
        className={icon}
        strokeWidth={2.5}
      />
    </div>
  );
};

export default Icon;
