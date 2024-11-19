import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/simple-icon.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";


export class HaxCard extends LitElement {
  static get tag() {
    return "hax-card";
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      link: { type: String },
      slug: { type: String },
      image: { type: String},
      icon: { type: String },
      lastUpdated: { type: String },
      showDetails: { type: Boolean }
    };
  }
  constructor() {
    super();
    this.showDetails = false; 
    this.wordCount = 0;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        background-color: #86acbc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      :host(:hover) {
        background-color: #d6faff; 
        transform: translateY(-5px); 
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
      }
      .card-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 4px;
      }
      h3 {
        font-size: 1rem;
        margin-bottom: 10px;
      }
      p {
        font-size: 0.9rem;
        color: #000000;
        margin-bottom: 10px;
      }
      a {
        color: #ffffff;
        font-size: 0.9rem;
      }
      a:hover {
        text-decoration: underline;
      }
      .links {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
      }
      .date {
        font-size: 0.8rem;
        color: #666;
        margin-top: 10px;
        font-weight: bold;
      }
      .date {
        font-size: 0.8rem;
        color: #666;
        margin-top: 10px;
        font-weight: bold;
      }
      .details-toggle {
        margin-top: 10px;
        cursor: pointer;
        color: #0056b3;
        font-size: 0.9rem;
      }

      .details-toggle:hover {
        text-decoration: underline;
      }

      .details {
        margin-top: 10px;
        padding: 10px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.85rem;
        text-align: left;
      }
    `;
  }

  toggleDetails(){
    this.showDetails = !this.showDetails;
  }


  showWordCount(text) {
    if (!text) return 0;
    return text.split(/\s+/).filter((word) => word.length > 0).length; 
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }

  render() {
    return html`
      <div>
        ${this.image
          ? html`<img src="${this.image}" alt="${this.title}" class="card-image" />`
          : html`<simple-icon icon="${this.icon || "help-outline"}"></simple-icon>`}
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <p class="date">Last Updated: ${this.lastUpdated || "N/A"}</p>
        <div class="links">
          <a href="${this.link}" target="_blank" rel="noopener noreferrer">Visit Page</a>
          <a href="${this.sourceLink}" target="_blank" rel="noopener noreferrer">Source</a>
        </div>
        <p class="details-toggle" @click="${this.toggleDetails}">
          ${this.showDetails ? "Hide Details" : "Show Details"}
        </p>
        ${this.showDetails
          ? html`
              <div class="details">
                <p><strong>Word Count:</strong> ${this.showWordCount(this.description)}</p>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define(HaxCard.tag, HaxCard);
