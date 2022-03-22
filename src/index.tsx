import React from "react";
import ReactDOM from "react-dom";
import Portlet from "./Portlet";
import "@clayui/css/lib/css/atlas.css";
import objectDef from "./setup/objectDef.json";
import { LiferayProvider } from "@toadslop/remote-react-app-toolkit";

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

    return ReactDOM.render(
      <React.StrictMode>
        <LiferayProvider requiredProperties={["stylePicklistId", "folderId", "repoId"]} elementId={ELEMENT_ID}>
          <Portlet />
        </LiferayProvider>
      </React.StrictMode>,
      this
    );
  }
}

const ELEMENT_ID = "beer-book";

if (!customElements.get(ELEMENT_ID))
  customElements.define(ELEMENT_ID, WebComponent);
