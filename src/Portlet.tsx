import { useEffect, useState } from 'react';
import ClayLayout from '@clayui/layout';
import ClayButton from '@clayui/button';
import AddBeerModal from './components/AddBeerModal';
import { getBeers } from './api/beers';
import { components } from './api/schema';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import BeerCard from './components/BeerCard';
import { useLiferayMatch } from '@toadslop/remote-react-app-toolkit';

interface Props { }

function Portlet(props: Props) {
  const [data, setData] = useState<components["schemas"]["Beer"][]>();
  const [selectedBeer, setSelectedBeer] = useState<components["schemas"]["Beer"]>();
  const [visible, setVisible] = useState(false);
  useEffect(() => { getBeers(setData) }, [])
  const match = useLiferayMatch("beerbook/:id");
  useEffect(() => {
    if (match && data) {
      const beer = data?.find(item => String(item.id) === String(match.params.id));
      setSelectedBeer(beer);
      setVisible(true)
    }
  }, [data])

  return (
    <ClayLayout.ContainerFluid view>
      <h2>Welcome to Liferay Beerbook!</h2>
      <ClayButton onClick={() => setVisible(true)}>Add beer!</ClayButton>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data ?
          data.map((item: any, index: number) => <BeerCard setSelectedBeer={setSelectedBeer} setVisible={setVisible} key={index} item={item} />) :
          <ClayLoadingIndicator />}
      </div>
      <AddBeerModal selectedBeer={selectedBeer} setData={setData} data={data} setVisible={setVisible} visible={visible} />
    </ClayLayout.ContainerFluid>
  );
}

export default Portlet;
