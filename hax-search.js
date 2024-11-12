import { LitElement, html, css } from "lit";

export class HaxSearch extends LitElement {
  static get tag() {
    return "hax-search";
  }

  constructor() {
    super();
    this.siteUrl = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
        margin-bottom: 20px;
      }
      input {
        width: 60%;
        max-width: 400px;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
      }
      button {
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    `;
  }

  render() {
    return html`
      <div>
        <input
          type="text"
          placeholder="Enter site URL"
          .value="${this.siteUrl}"
          @input="${(e) => (this.siteUrl = e.target.value)}"
        />
        <button @click="${this._handleAnalyze}">Analyze</button>
      </div>
    `;
  }

  _handleAnalyze() {
    if (this.siteUrl.trim() === "") {
      alert("Please enter a valid site URL.");
      return;
    }
    this.dispatchEvent(
      new CustomEvent("analyze-site", {
        detail: this.siteUrl,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define(HaxSearch.tag, HaxSearch);
