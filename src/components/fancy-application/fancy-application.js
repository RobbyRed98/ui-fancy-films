import { html, LitElement } from "@polymer/lit-element";
import "../fancy-table/fancy-table.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-layout/app-header/app-header.js";
import { baseConfig } from "../../../config/config.js"

class FancyApplication extends LitElement {

    get properties() {
        return {
            _client: HTTPRequestHandler
        }
    }

    constructor() {
        super();
        this._client = new HTTPRequestHandler();
    }

    async firstUpdated() {

    }

    render() {
        html`
            <app-header reveals>
                <app-toolbar>
                    <div main-title>FancyFilms</div>
                </app-toolbar>
            </app-header>
            <fancy-table resources="http://localhost:5000/media/type/Serie"></fancy-table>
        `
    }
}

customElements.define("fancy-application",FancyApplication);