'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

import styles from '@/components/shared/Button.module.css';

export type ButtonVariant = 
  | 'primary' | 'primarySm' | 'primaryLg' 
  | 'secondary' 
  | 'outline' | 'outlineSm' | 'outlineLg' 
  | 'ghost' | 'ghostSm';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-expanded'?: boolean;
  'aria-haspopup'?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  disabled = false,
  type = 'button',
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHasPopup,
}: ButtonProps): React.JSX.Element => {
  const className = `${styles.base} ${styles[variant]}`.trim();

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
    >
      {children}
    </button>
  );
};

export default Button;
