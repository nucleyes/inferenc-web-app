/**
 * Accessibility utilities to improve component accessibility
 */

import { ButtonProps } from "@nextui-org/react";

/**
 * Adds required accessibility attributes to icon-only buttons
 * @param props Original button props
 * @param label The aria label to use
 * @returns Enhanced button props with proper accessibility attributes
 */
export function enhanceIconButton(props: ButtonProps, label: string): ButtonProps {
  return {
    ...props,
    "aria-label": label,
  };
}

/**
 * Makes an element explicitly hidden from screen readers
 * @param props Original element props
 * @returns Enhanced props with screen reader hiding
 */
export function hideFromScreenReaders<T extends object>(props: T): T {
  return {
    ...props,
    "aria-hidden": true,
  };
} 