import { html, LitElement } from '@polymer/lit-element';
import "@vaadin/vaadin-grid/vaadin-grid.js";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import { HTTPError, HTTPRequestHandler } from "../../httpRequestHandler/httpRequestHandler";

export class FancyTable extends LitElement {

    get properties() {
        return {
            _client: HTTPRequestHandler,
            resources: JSON
        }
    }

    constructor() {
        super();
        this._client = new HTTPRequestHandler();
    }

    async firstUpdated() {
        const grid = this.shadowRoot.querySelector('vaadin-grid');
        grid.items = await this._load();
        console.log(grid.items.length);
    }

    render() {
        return html`
            <vaadin-grid id="series" multi-sort>
                <vaadin-grid-sort-column width="9em" path="name" header="Name"></vaadin-grid-sort-column>
                <vaadin-grid-sort-column width="9em" path="genre" header="Genre"></vaadin-grid-sort-column>
                <vaadin-grid-sort-column width="15em" path="rating" header="Rating"></vaadin-grid-sort-column>
            </vaadin-grid>
        `;
    }

    async _load() {
        try{
            var sth = await this._client.get("http://localhost:5000/media/type/Serie");
            var data = [];
            console.log(sth);

            sth.json().then(json => json.forEach(element => {
                data.push(element);
                console.log(element);
            }));
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

customElements.define('fancy-table', FancyTable);