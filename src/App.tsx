import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useResource } from '@clayui/data-provider';
import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';


function App() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import('./dummyData/dummy.json')
        .then((json) => {
          setData(json.items);
        });
    }
  })

  const { resource } = useResource({
    link: `${Liferay?.ThemeDisplay.getPortalURL()}/o/c/beers?p_auth=${Liferay.authToken}`
  });

  useEffect(() => {
    if (resource) setData(resource.items);
  }, [resource])

  return (
    <ClayLayout.ContainerFluid view>
      <h2>Welcome to Liferay Beerbook!</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.map((item: any) => {
          return <ClayCard style={{ width: "400px", margin: "40px", flexShrink: 0, flexWrap: "wrap" }}>
            <ClayCard.Body>
              <ClayCard.Description displayType="title">
                <h3>{item.name}</h3>
              </ClayCard.Description>
              <div style={{ display: "flex" }}>
                <div style={{ height: "100%", flexBasis: 0, flex: "1 1 0px" }}>
                  <div><b>Brewer:</b> {item.brewer}</div>
                  <div><b>EBC:</b> {item.eBC}</div>
                  <div><b>IBU:</b> {item.iBU}</div>
                  <div><b>ABV:</b> {item.aBV}</div>
                  <div><b>Price:</b> {item.price}</div>
                </div>
                <div style={{ flexBasis: 0, flex: "1 1 0px", maxHeight: "150px", alignItems: "center", justifyContent: "center" }}>
                  <img
                    alt="beer"
                    className="card-item-first"
                    src={item.imageUrl}
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </ClayCard.Body>
          </ClayCard>
        })}
      </div>
    </ClayLayout.ContainerFluid>
  );
}

export default App;
