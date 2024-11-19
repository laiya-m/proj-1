import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/simple-icon.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

export class HaxSiteOverview extends LitElement {
  static get tag() {
    return "hax-site-overview";
  }

  static get properties() {
    return {
      siteData: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        margin: 20px 0;
        background-color: var(--site-color, #86acbc);
        border-radius: 8px;
        color: white;
      }
      .overview-container {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .site-info {
        flex: 1;
      }
      .site-icon {
        width: 100px;
        height: 100px;
      }
      h2 {
        margin: 0 0 10px 0;
      }
      p {
        margin: 5px 0;
      }
      .metadata {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        margin-top: 15px;
      }
    `;
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }

  render() {
    if (!this.siteData) return html``;

    const {
      title,
      description,
      metadata = {}
    } = this.siteData;

    const {
      created,
      updated,
      theme = {},
      icon,
      logo
    } = metadata;

    return html`
      <div class="overview-container" style="--site-color: ${theme.hexCode || '#86acbc'}">
        <div class="logo-container">
          ${logo 
            ? html`<img src="${logo}" alt="${title} logo" class="site-icon">` 
            : html`<simple-icon icon="${icon || 'website'}" class="site-icon"></simple-icon>`
          }
        </div>
        <div class="site-info">
          <h2>${title || 'Site Overview'}</h2>
          <p>${description || 'No description available'}</p>
          <div class="metadata">
            <p><strong>Created:</strong> ${this.formatDate(created)}</p>
            <p><strong>Last Updated:</strong> ${this.formatDate(updated)}</p>
            <p><strong>Theme:</strong> ${theme.name || 'Default'}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(HaxSiteOverview.tag, HaxSiteOverview);