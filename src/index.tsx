import React from 'react';
import ReactDOM from 'react-dom';
import Portlet from './Portlet';
import "@clayui/css/lib/css/atlas.css";

declare global {
  const Liferay: any;
}

class WebComponent extends HTMLElement {
  connectedCallback() {
    return ReactDOM.render(
      <React.StrictMode>
        <Portlet styleListId={this.getAttribute("stylePicklistId") || ""} folderId={this.getAttribute("folderId") || ""} repoId={this.getAttribute("repoId") || ""} />
      </React.StrictMode>
      , this
    )
  }
}

const ELEMENT_ID = 'beer-book';

if (!customElements.get(ELEMENT_ID)) customElements.define(ELEMENT_ID, WebComponent);
