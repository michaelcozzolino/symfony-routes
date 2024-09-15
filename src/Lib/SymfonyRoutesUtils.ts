import type { RouteParams, SymfonyRoute } from "../Types/SymfonyRoutes";
import { isObject, isRecord, isString }   from "./TypesUtils";

export const getSymfonyRoutePath = <T extends string>(symfonyRoutes: unknown, routeName: T, parameters?: RouteParams): string => {
    const symfonyRoute: SymfonyRoute = getSymfonyRoute(symfonyRoutes, routeName);
    let routePath                    = symfonyRoute.path;

    if (parameters !== undefined) {
        for (const key in parameters) {
            const value               = parameters[key];
            const routePathWithParams = routePath.replace(`{${key}}`, `${value}`);

            if (routePathWithParams === routePath) {
                throw new Error(`Unable to find parameter ${key} in ${routePath}.`);
            }

            routePath = routePathWithParams;
        }
    } else {
        const parameterNameTemplateStartIndex = routePath.indexOf('{');
        const parameterNameTemplateEndIndex   = routePath.indexOf('}');

        if (parameterNameTemplateStartIndex !== -1 && parameterNameTemplateEndIndex !== -1) {
            throw new Error(`Parameter ${routePath.substring(parameterNameTemplateStartIndex + 1, parameterNameTemplateEndIndex)} not found in ${routePath}.`);
        }
        // only one should be not found and not both, in order for the path to be malformed
        else if (+(parameterNameTemplateStartIndex === -1) ^ +(parameterNameTemplateEndIndex === -1)) {
            throw new Error(`Malformed route path ${routePath}.`);
        }
    }

    return routePath;
}

export const getSymfonyRoute = <T extends string>(routes: unknown, routeName: T): SymfonyRoute => {
    if (isRecord<T, SymfonyRoute>(routes) === false) {
        throw new TypeError('The symfony routes must be an object.');
    }

    const route = (routes as Record<string, unknown>)[routeName];

    const condition = isObject(route) &&
        'name' in route &&
        'path' in route &&
        isString(route.name) &&
        isString(route.path) &&
        routeName === route.name;

    if (condition === false) {
        throw new TypeError(`Symfony route ${routeName} is not valid. Got ${JSON.stringify(route)}.`);
    }

    return routes[routeName];
}
