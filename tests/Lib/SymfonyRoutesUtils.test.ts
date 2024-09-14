import { describe, expect, test }                                                     from "vitest";
import { getSymfonyRoute, getSymfonyRoutePath, type RouteParams, type SymfonyRoutes } from "@/index";

type AvailableRouteNames = 'route1' | 'route2';

describe('SymfonyRoutesUtils', () => {
    test.each<[AvailableRouteNames, RouteParams | undefined, string]>([
        ['route1', undefined, '/route1'],
        ['route2', { param1: 10, param2: 'products' }, '/path/10/route2/products'],
    ])('Get symfony route path', (routeName, parameters, expectedRoutePath) => {
        const routes: SymfonyRoutes<AvailableRouteNames> = {
            'route1': {
                name: 'route1',
                path: '/route1',
            },
            'route2': {
                name: 'route2',
                path: '/path/{param1}/route2/{param2}',
            }
        };

        expect(getSymfonyRoutePath(routes, routeName, parameters,)).toBe(expectedRoutePath);
    });

    test.each<[AvailableRouteNames | 'route3' | 'route4' | 'route5' | 'route6', RouteParams | undefined]>([
        ['route1', { param: 4 }],
        ['route2', { param1: 10, param2: 'products' }],
        ['route3', { param2: 'products' }],
        ['route4', undefined],
        ['route5', undefined],
        ['route6', undefined],
    ])('Get symfony route path when parameters are not valid', (routeName, parameters) => {
        const routes: SymfonyRoutes<AvailableRouteNames | 'route3' | 'route4' | 'route5' | 'route6'> = {
            'route1': {
                name: 'route1',
                path: '/route1',
            },
            'route2': {
                name: 'route2',
                path: '/path/{param1}/route2',
            },
            'route3': {
                name: 'route3',
                path: '/path/{param1}/route3',
            },
            'route4': {
                name: 'route4',
                path: '/path/{param1}/route4',
            },
            'route5': {
                name: 'route5',
                path: '/path/{param/route5',
            },
            'route6': {
                name: 'route6',
                path: '/path/param}/route6',
            }
        };

        expect(() => getSymfonyRoutePath(routes, routeName, parameters)).toThrow();
    });

    test('Get symfony route', () => {
        const routes: SymfonyRoutes<AvailableRouteNames> = {
            'route1': {
                name: 'route1',
                path: '/route1',
            },
            'route2': {
                name: 'route2',
                path: '/path/to/route2',
            }
        };

        const routeName: AvailableRouteNames = 'route2';

        expect(getSymfonyRoute<AvailableRouteNames>(routes, routeName)).toBe(routes[routeName]);
    });

    test.each([
        ['routes'],
        [['routes']],
        [null],
    ])('Get symfony route when the imported routes cannot be represented as object', (routes) => {
        expect(() => getSymfonyRoute(routes, 'routeName')).toThrow('The symfony routes must be an object.');
    });

    test.each([
        ['route0'],
        ['route1'],
        ['route2'],
        ['route3'],
        ['route4'],
        ['route5'],
    ])('Get symfony route when the requested route is not valid', (routeName) => {
        const routes: Record<string, unknown> = {
            'route0': null,
            'route1': {
                path: '/route1',
            },
            'route2': {
                name: 'route2',
            },
            'route3': {
                name: 3,
                path: '/route3-path'
            },
            'route4': {
                name: 'route4',
                path: undefined
            },
            'route5': {
                name: 'route42',
                path: '/path'
            }
        };

        expect(() => getSymfonyRoute(routes, routeName)).toThrow(`Symfony route ${routeName} is not valid. Got ${JSON.stringify(routes[routeName])}.`);
    });
});
