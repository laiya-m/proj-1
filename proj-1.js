import { LitElement, html, css } from "lit";
import "./hax-search.js";
import "./hax-card.js";

export class Proj1 extends LitElement {
  static get tag() {
    return "proj-1";
  }

  constructor() {
    super();
    this.siteData = null;
    this.error = null;
    this.filterQuery ="";
  }

  static get properties() {
    return {
      siteData: { type: Object },
      error: { type: String },
      filterQuery: { type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Courier;
        padding: 16px;
      }
      h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 20px;
      }
      .error {
        color: red;
        text-align: center;
        margin: 20px 0;
      }
      .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
      }
      .filter-search-bar {
        text-align: center;
        margin: 20px 0;
      }
      .filter-search-bar input {
        width: 60%;
        max-width: 400px;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    `;
  }

  async fetchSiteData(url) {
    try {
      if (!url.endsWith("/site.json")) {
        url += "/site.json";
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please check the URL.");
      }
      const data = await response.json();
      this.validateSiteData(data);
      this.siteData = data;
      this.baseUrl = url.replace("/site.json", "");
      this.error = null;
    } catch (error) {
      this.siteData = null;
      this.error = error.message;
    }
  }

  validateSiteData(data) {
    if (!data || !data.items) {
      throw new Error("Invalid site.json structure.");
    }
  }
  updateFilterQuery(e) {
    this.filterQuery = e.target.value.toLowerCase(); // Update filter query dynamically
  }

  getFilteredCards() {
    if (!this.siteData || !this.siteData.items) return [];
    return this.siteData.items.filter(
      (item) =>
        item.title.toLowerCase().includes(this.filterQuery) ||
        (item.description || "").toLowerCase().includes(this.filterQuery)
    );
  }
  renderCards() {
    const items = this.getFilteredCards();
    if (items.length === 0) {
      return html`<p>No matching pages found.</p>`;
    }
    return items.map(
      (item) =>
        html`<hax-card
          .title="${item.title}"
          .description="${item.description || "No description available."}"
          .link="${item.slug}"
        ></hax-card>`
    );
  }

  render() {
    return html`
      <h1>Analyze Your Site</h1>
      <hax-search
        @analyze-site="${(e) => this.fetchSiteData(e.detail)}"
      ></hax-search>
      ${this.siteData
        ? html`
            <div class="filter-search-bar">
              <input
                type="text"
                placeholder="Search through pages..."
                @input="${this.updateFilterQuery}"
              />
            </div>
          `
        : ""}
      ${this.error
        ? html`<p class="error">${this.error}</p>`
        : html`<div class="cards">${this.renderCards()}</div>`}
    `;
  }
}

customElements.define(Proj1.tag, Proj1);
