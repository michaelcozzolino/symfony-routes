export type SymfonyRoute = Readonly<{
    name: string;
    path: string
}>;

type SymfonyRoutes<T extends string> = Record<T, SymfonyRoute>;

export type RouteParams = Record<string, string | number>;

export default SymfonyRoutes;
