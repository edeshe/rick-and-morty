import React, { useState, useEffect } from "react";
import { 
    Card,
} from "react-bootstrap";

const DetalleEpisodios = ({url}) => {
    let [fetchedData, updateFetchedData] = useState([]);

    useEffect(() => {
        (async function () {
            let data = await fetch(url).then((res) => res.json());
            updateFetchedData(data);
        })();
    }, [url]);

    return(
        <Card style={{ width: '18rem', display: 'inline-flex', margin: '5px' }} key={fetchedData.id}>
            <Card.Header>
                <b>{fetchedData.name}</b>
            </Card.Header>
            <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{fetchedData.air_date}</Card.Subtitle>
            <Card.Text>
                Episodio: {fetchedData.episode}
            </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default DetalleEpisodios;