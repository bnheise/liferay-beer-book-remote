import React, { useEffect, useState } from 'react';
import './App.css';
import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayButton from '@clayui/button';
import AddBeerModal from './components/AddBeerModal';
import axios from 'axios';

interface Props {
  Liferay: any;
}
function App({ Liferay }: Props) {
  const [data, setData] = useState<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!process.env.REACT_APP_USE_DXP) {
      import('./dummyData/dummy.json')
        .then((json) => {
          setData(json.items);
        });
    } else {
      const getBeers = async () => {
        const response = await axios.get(`${Liferay?.ThemeDisplay?.getPortalURL()}/o/c/beers?p_auth=${Liferay.authToken}`)
        setData(response.data.items);
      };
      getBeers();
    }
  }, [])

  return (
    <ClayLayout.ContainerFluid view>
      <h2>Welcome to Liferay Beerbook!</h2>
      <ClayButton onClick={() => setVisible(true)}>Add beer!</ClayButton>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.map((item: any, index: number) => {
          return <ClayCard key={index} style={{ width: "400px", margin: "40px", flexShrink: 0, flexWrap: "wrap" }}>
            <ClayCard.Body>
              <h3>{item.name}</h3>
              <div style={{ display: "flex" }}>
                <div style={{ height: "100%", flexBasis: 0, flex: "1 1 0px" }}>
                  <div><b>Style:</b> {item.style.name}</div>
                  <div><b>Brewer:</b> {item.brewer}</div>
                  <div><b>EBC:</b> {item.eBC}</div>
                  <div><b>IBU:</b> {item.iBU}</div>
                  <div><b>ABV:</b> {item.aBV}%</div>
                  <div><b>Price:</b> {item.price} yen</div>
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
      <AddBeerModal setData={setData} data={data} Liferay={Liferay} setVisible={setVisible} visible={visible} />
    </ClayLayout.ContainerFluid>
  );
}

export default App;
