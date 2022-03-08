import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@clayui/css/lib/css/atlas.css";

const { REACT_APP_USE_LOCAL } = process.env;

declare global {
  const Liferay: any;
}

const renderApp = (container: HTMLElement | null) => {

  let liferay;
  try {
    liferay = Liferay;
  } catch (e) {
    liferay = {}
  }
  return ReactDOM.render(
    <React.StrictMode>
      <App Liferay={liferay} />
    </React.StrictMode>
    , container
  )
}

if (REACT_APP_USE_LOCAL) {
  console.log("TOP")
  renderApp(document.getElementById('root'))
} else {
  console.log("BOTTOM")
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
