import notFound from "../images/notavailable.png"

export default function ItemCard(props) {

    return (
        <>
            <div className={`card itemCard bg-${props.mode === 'light' ? 'light cardShadowD' : 'black cardShadowW'}`} style={{ border: `2px solid ${props.mode === 'light' ? 'black' : 'white'}` }}>
                <img src={props.itemImage !== null ? props.itemImage : notFound} className={`card-img-top card-header border-${props.mode === 'light' ? 'light' : 'dark'}`} alt="Unable to load..." />
                <div className="card-body">
                    <h5 className={`card-title text-${props.mode === 'light' ? 'black' : 'light'}`}><strong>{props.itemName.toUpperCase()}</strong></h5>
                    <p className="card-text"><strong>Id : </strong>#{props.itemId}</p>
                    <p className="card-text"><strong>Attribute : </strong>{props.itemAttributes}</p>
                    <p className="card-text"><strong>Category : </strong>{props.category}</p>
                    <p className="card-text"><strong>Effect : </strong>{props.effect}</p>
                </div>
            </div>
        </>
    )
}
