import { useEffect, useState } from 'react';
import ClayLayout from '@clayui/layout';
import ClayButton from '@clayui/button';
import AddBeerModal from './components/AddBeerModal';
import { getBeers } from './api/beers';
import { components } from './api/schema';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import BeerCard from './components/BeerCard';

interface Props {
  folderId: string,
  repoId: string,
  styleListId: string,
}

function Portlet({ folderId, repoId, styleListId }: Props) {
  const [data, setData] = useState<components["schemas"]["Beer"][]>();
  const [visible, setVisible] = useState(false);
  useEffect(() => { getBeers(setData) }, [])

  return (
    <ClayLayout.ContainerFluid view>
      <h2>Welcome to Liferay Beerbook!</h2>
      <ClayButton onClick={() => setVisible(true)}>Add beer!</ClayButton>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data ?
          data.map((item: any, index: number) => <BeerCard key={index} item={item} />) :
          <ClayLoadingIndicator />}
      </div>
      <AddBeerModal styleListId={styleListId} folderId={folderId} repoId={repoId} setData={setData} data={data} setVisible={setVisible} visible={visible} />
    </ClayLayout.ContainerFluid>
  );
}

export default Portlet;
