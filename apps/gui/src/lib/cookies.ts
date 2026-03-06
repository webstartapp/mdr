/**
 * Standardized cookie utility for the MDR Regulation Adviser.
 * Ensures consistent cookie handling with security best practices.
 */

export const setCookie = (
  name: string,
  value: string,
  days: number = 365,
): void => {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};
