export type SymfonyRoute = Readonly<{
    name: string;
    path: string
}>;

type SymfonyRoutes = Record<string, SymfonyRoute>;

export default SymfonyRoutes;
