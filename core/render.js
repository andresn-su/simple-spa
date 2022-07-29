import { Router } from "./router.js";
import { appModule } from "../src/app.module.js";

/**
 * @class
 */
export default class Render
{
    /** The current path */
    path;

    /** The HTML tag where the app will be loaded */
    app;

    /** The router outlet - present in the appComponent's template */
    outlet;

    /** An array containing all the anchors present on the DOM */
    links;

    /** A Router instance */
    router;

    /** All the components listed in the appModule */
    components;

    /**
     * @constructor
     */
    constructor()
    {
        document.addEventListener('DOMContentLoaded', () => {
            this.links = Array.from(document.querySelectorAll("[data-to]"));
        });

        this.router = new Router;
        this.path = location.pathname;
        this.components = appModule.components;
        this.app = document.getElementById("app");

        this.appRender();
        this.outlet = document.querySelector("router-outlet");

        this.router.loadComponent(this.path).pushState();
    }

    /**
     * Search for anchors on the document and listen for clicks to loading their respective components
     * @returns Render
     */
    activateAnchors()
    {
        if(!this.links) return this;

        this.links.forEach(linkEl => {
            linkEl.addEventListener('click', () => {
                let component = this.components.find(component => component.path == linkEl.dataset.to);
                this.render(component);
            });
            linkEl.style.cursor = "pointer";
    
            if (linkEl.dataset.to == this.path)
            {
                let component = this.components.find(component => component.path == linkEl.dataset.to);
                this.render(component);
            }
        });

        return this;
    }

    /**
     * Loads the current component based on the current path
     * @returns Render
     */
    activateComponents()
    {
        let route = this.router.routes.find(route => route.path == this.path);
        this.render(route.component);
        return this;
    }

    /**
     * Loads a component inside the 'router-outlet' custom tag
     * @param {Object} component 
     * @returns Render
     */
    render(component)
    {
        this.outlet.innerHTML = component.template;
        this.router.loadComponent(component).pushState();
        return this;
    }

    /**
     * Render the appComponent's template
     * @returns Render
     */
    appRender()
    {
        let component = this.components.appComponent
        this.app.innerHTML = component.template;
        return this;
    }
}
