import React from "react";
import ReactDOM from "react-dom";
import Portlet from "./Portlet";
import "@clayui/css/lib/css/atlas.css";
import objectDef from "./setup/objectDef.json";
import { BrowserRouter } from "react-router-dom";

declare global {
  const Liferay: any;
}

class WebComponent extends HTMLElement {
  connectedCallback() {

    console.log(objectDef)
    Liferay.Service(
      '/object.objectdefinition/get-object-definitions',
      {
        start: 0,
        end: 100
      },
      function (obj: any) {
        console.log(obj);
      }
    );

    const requiredParams = ["stylePicklistId", "folderId", "repoId"]
    const values = requiredParams.map(key => this.getAttribute(key));
    const missingValues = values.reduce((list: string[], current, index) => {
      if (!current) list.push(requiredParams[index]);
      return list;
    }, []);

    if (missingValues.length === 0) {
      console.log(window.location.href)
      return ReactDOM.render(
        <React.StrictMode>
          <BrowserRouter>
            <Portlet
              styleListId={this.getAttribute("stylePicklistId") || ""}
              folderId={this.getAttribute("folderId") || ""}
              repoId={this.getAttribute("repoId") || ""}
            />
          </BrowserRouter>
        </React.StrictMode>,
        this
      );
    } else {
      return ReactDOM.render(
        <React.StrictMode>
          <h2>Error!</h2>
          <p>This remote app requires the following parameters to function properly:</p>
          <ul>
            {requiredParams.map((param, index) =>
              <li key={index}>{param}</li>
            )}
          </ul>
          <p>However, only the following is missing:</p>
          <ul>
            {missingValues.map((param, index) =>
              <li style={{ color: "red" }} key={index}>{param}</li>
            )}
          </ul>
          <p>Please navigate to the remote app's configuration and enter the necessary values.</p>
        </React.StrictMode>,
        this
      )
    }

  }
}

const ELEMENT_ID = "beer-book";

if (!customElements.get(ELEMENT_ID))
  customElements.define(ELEMENT_ID, WebComponent);
