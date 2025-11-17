/**
 * Converts a string to a URL-friendly slug
 * @param str The string to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters and dashes with a single dash
    .replace(/-+/g, '-') // Replace multiple dashes with a single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}
