import { routes } from "../src/router.js";
import { appModule } from "../src/app.module.js";

/**
 * @class
 */
export class Router
{
    /** All the components (listed in the appModule) */
    components;

    /** All the registered routes */
    routes;

    /** @var {Object|null} - the current path */
    currentRoute = null;

    /**
     * @constructor
     */
    constructor()
    {
        this.components = appModule.components;
        this.routes = routes;
    }

    /**
     * Sets the current component
     * @param {string} path
     * @return {Router}
     */
    loadComponent(path)
    {
        this.currentRoute = this.routes.find(route => route.path == path);
        return this;
    }

    /**
     * Creates a new state in the browser history
     * @returns Router|bool
     */
    pushState()
    {
        if(!this.currentRoute) return false;
        history.pushState({}, this.currentRoute.component.title, this.currentRoute.path);
        document.title = this.currentRoute.component.title ?? document.title;
        return this;
    }
}
