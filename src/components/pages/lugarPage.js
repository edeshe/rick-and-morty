import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
    Container,
    Card,
    Image,
    Button,
    Modal,
} from "react-bootstrap";
import PersonajesLugar from "./personajesLugar";

const LugarPage = () => {
    let { id } = useParams();
    let [fetchedData, updateFetchedData] = useState([]);
    // let { name, location, origin, gender, image, status, species } = fetchedData;
    let api = `https://rickandmortyapi.com/api/location/${id}`;
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setModalTitle(data.name);
        setModalBody(data.image);
        setShow(true);
    };

    useEffect(() => {
        (async function () {
            let data = await fetch(api).then((res) => res.json());
            updateFetchedData(data);
        })();
    }, [api]);

    return(
        <Container>
            <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: "left" }}>
                <a href={`/lugares`} className="btn btn-primary btn-sm">Regresar</a>
            </div>
            <div>
                <h1>Lugar</h1>
                <Card 
                    style={{ width: '25em', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.5em' }} 
                    key={fetchedData.id} 
                    bg='warning glyph'
                    text='black'
                >
                    <Card.Body>
                        <Card.Title>
                            {fetchedData.name}
                        </Card.Title>
                        <Card.Text style={{ textAlign: 'left', padding: '10px' }}>
                            Tipo: {fetchedData.type}<br />
                            Dimensión: {fetchedData.dimension}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div style={{ marginTop: '15px' }}>
                <h2>Personajes</h2>
                {fetchedData.hasOwnProperty('residents') 
                ?
                fetchedData.residents.map((personaje) =>{
                    return (
                        <PersonajesLugar url={personaje} handleShow={handleShow} />
                    );
                })
                : <div className="ob-sell-tile">Sin resultados...</div> }
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <Image src={modalBody} width='100%' rounded />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
};

export default LugarPage;