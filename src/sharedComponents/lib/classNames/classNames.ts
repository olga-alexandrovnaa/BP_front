export type Mods = Record<string, string | boolean | undefined>;

export function classNames(
  mainClass: string,
  mods: Mods = {},
  otherClasses: Array<string | undefined> = [],
): string {
  return [
    mainClass,
    ...otherClasses.filter(Boolean),
    ...(Object.entries(mods)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className)),
  ].join(' ');
}
