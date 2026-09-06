const isItchBuild = process.env.NEXT_PUBLIC_ITCH_BUILD === "true";

export const assetPath = (path: string) => (isItchBuild && path.startsWith("/") ? `.${path}` : path);
