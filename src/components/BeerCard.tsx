import ClayCard from '@clayui/card'
import { components } from '../api/schema'

type Props = {
    item: components["schemas"]["Beer"]
}

const BeerCard = ({ item }: Props) => {
    return (
        <ClayCard style={{ width: "400px", margin: "40px", flexShrink: 0, flexWrap: "wrap" }}>
            <ClayCard.Body>
                <h3>{item.name}</h3>
                <div style={{ display: "flex" }}>
                    <div style={{ height: "100%", flexBasis: 0, flex: "1 1 0px" }}>
                        <div><b>Style:</b> {item.style?.name}</div>
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
    )
}

export default BeerCard