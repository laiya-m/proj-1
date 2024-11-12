import { LitElement, html, css } from "lit";

export class HaxCard extends LitElement {
  static get tag() {
    return "hax-card";
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      link: { type: String },
    };
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
        background-color: #d6faff; /* Change the background color on hover */
        transform: translateY(-5px); /* Slightly lift the card */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
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
    `;
  }

  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <a href="${this.link}" target="https://haxtheweb.org/" >Visit Page</a>
      </div>
    `;
  }
}

customElements.define(HaxCard.tag, HaxCard);
