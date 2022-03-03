import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@clayui/css/lib/css/atlas.css";

const spritemap =
  "https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg";
const { NODE_ENV } = process.env;

const renderApp = (container: HTMLElement | null) => {
  return ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
    , container
  )
}

if (NODE_ENV === "development") {
  renderApp(document.getElementById('root'))
} else {
  class WebComponent extends HTMLElement {

    connectedCallback() {

      renderApp(this);
    }

  }

  const ELEMENT_ID = 'beer-book';

  if (!customElements.get(ELEMENT_ID)) {

    customElements.define(ELEMENT_ID, WebComponent);

  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
