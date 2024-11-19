import { LitElement, html, css } from "lit";
import "./hax-search.js";
import "./hax-card.js";
import "./hax-site-overview.js";


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
      filterQuery: { type: String}, //filtering the search
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Courier;
        padding: 16px;
        background-color: #5e5e5e;    
      }
      h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 20px;
      }

      .cards{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .filter-search-bar {
        text-align: center;
        margin: 20px 0;
      }
      .filter-search-bar input {
        width: 60%;
        max-width: 400px;
        padding: 10px;
        border: 1px solid #aa7b7b;
        border-radius: 4px;
    `;
  }
//get the data from the site.json file
  async fetchSiteData(url) {
    try {
      if (!url.endsWith("/site.json")) {
        url += "/site.json"; //this here adds the end of the url in case the user forgets 
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No data fetched. Please check your inputted URL.");
      }
      const data = await response.json();
      this.validateSiteData(data);
      
      // add baseUrl to the siteData
      this.baseUrl = url.replace("/site.json", "");
      this.siteData = {
        ...data,
        baseUrl: this.baseUrl};
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
  //got this directly from chatgpt. 
  slugifyTitle(title) {
  return title
    .toLowerCase() 
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

renderCards() {
  const items = this.getFilteredCards();
  if (items.length === 0) {
    return html`<p>No pages found.</p>`;
  }
  return items.map(
    (item) => html`
      <hax-card
        .title="${item.title}"
        .description="${item.description || "No description available."}"
        .link="${this.baseUrl}/${item.slug || this.slugifyTitle(item.title)}"
        .sourceLink="${this.baseUrl}/${item.location || `${this.slugifyTitle(item.title)}/index.html`}"
        .lastUpdated="${item.metadata?.updated || "N/A"}"
        .image="${item.metadata?.image}"
        .icon="${item.metadata?.icon || "article"}"
      ></hax-card>
    `
  );
}
  render() {
    return html`
      <h1>Analyze Your Site</h1>
      <hax-search @analyze-site="${(e) => this.fetchSiteData(e.detail)}"
      ></hax-search>
      ${this.siteData
      ? html`
        <hax-site-overview .siteData="${this.siteData}"></hax-site-overview>
        <div class="filter-search-bar">
          <input
            type="text"
            placeholder="Search through pages..."
            @input="${this.updateFilterQuery}"
          />
          </div>
            <div class="cards">${this.renderCards()}</div>
          `
        : ""}
      ${this.error ? html`<p class="error">${this.error}</p>`: html`}</div>`}
    `;
  }
}

customElements.define(Proj1.tag, Proj1);
