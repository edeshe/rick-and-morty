import React, { useState, useEffect } from "react";
import { 
    Card,
    Badge,
} from "react-bootstrap";

const PersonajesLugar = ({url, handleShow}) => {
    let [fetchedData, updateFetchedData] = useState([]);

    useEffect(() => {
        (async function () {
            let data = await fetch(url).then((res) => res.json());
            updateFetchedData(data);
        })();
    }, [url]);

    return(
        <Card style={{ width: '18rem', display: 'inline-flex', margin: '5px' }} key={fetchedData.id}>
            <Card.Header style={{ verticalAlign: "middle" }}>
                <img src={fetchedData.image} alt={fetchedData.name} className="imgThumbnail" onClick={() => handleShow(fetchedData)} />
                <div class="clearfix">
                    <b>{fetchedData.name}</b><br />
                    {(fetchedData.status === "Alive" &&
                        <Badge className="estatusCard" bg="success">{fetchedData.status}</Badge>)
                    || (fetchedData.status === "Dead" &&
                        <Badge className="estatusCard" bg="danger">{fetchedData.status}</Badge>)
                    ||
                        <Badge className="estatusCard" bg="secondary">{fetchedData.status}</Badge>
                    }
                </div>
            </Card.Header>
            <Card.Body>
            <Card.Text style={{ textAlign: "left" }}>
                Especie: {fetchedData.species}<br />
                Tipo: {fetchedData.type}<br />
                Género: {fetchedData.gender}
            </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default PersonajesLugar;