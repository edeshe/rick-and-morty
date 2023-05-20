import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
    Container,
    Card,
    Badge,
    Button,
} from "react-bootstrap";
import DetalleEpisodio from "./detalleEpisodios";

const PersonajePage = () => {
    let { id } = useParams();
    let [fetchedData, updateFetchedData] = useState([]);
    // let { name, location, origin, gender, image, status, species } = fetchedData;
    let api = `https://rickandmortyapi.com/api/character/${id}`;

    useEffect(() => {
        (async function () {
            let data = await fetch(api).then((res) => res.json());
            updateFetchedData(data);
        })();
    }, [api]);

    return(
        <Container>
            <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: "left" }}>
                <a href={`/`} className="btn btn-primary btn-sm">Regresar</a>
            </div>
            <h1>{fetchedData.name}</h1>
            <div>
                <Card style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }} key={fetchedData.id}>
                    <Card.Img variant="top" src={fetchedData.image} />
                    <Card.Body>
                        <Card.Title>
                        {(fetchedData.status === "Alive" &&
                            <Badge className="estatusCard" bg="success">{fetchedData.status}</Badge>)
                        || (fetchedData.status === "Dead" &&
                            <Badge className="estatusCard" bg="danger">{fetchedData.status}</Badge>)
                        ||
                            <Badge className="estatusCard" bg="secondary">{fetchedData.status}</Badge>
                        }
                        </Card.Title>
                        <Card.Text style={{ textAlign: 'left', padding: '10px' }}>
                            Especie: {fetchedData.species}<br />
                            Tipo: {fetchedData.type}<br />
                            Género: {fetchedData.gender}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div style={{ marginTop: '15px' }}>
                <h2>Episodios</h2>
                {fetchedData.hasOwnProperty('episode') 
                ?
                fetchedData.episode.map((episodio) =>{
                    return (
                        <DetalleEpisodio url={episodio} />
                    );
                })
                : <div className="ob-sell-tile">Sin resultados...</div> }
            </div>
        </Container>
    )
};

export default PersonajePage;