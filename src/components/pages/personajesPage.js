import { 
    Container,
    Button,
    Col,
    Form,
    Row,
    Card,
    Badge,
} from "react-bootstrap";
import { useState } from "react";
import Paginacion from "../paginacion";
import { Link } from "react-router-dom";

const PersonajesPage = () => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [species, setSpecies] = useState("");
    const [type, setType] = useState("");
    const [gender, setGender] = useState("");
    const [posts, setPosts] = useState([]);
    const urlCharacters = "https://rickandmortyapi.com/api/character";
    const [isLoading, setLoading] = useState(false);

    const otraPagina = (pag) => {
        setLoading(true);
        console.log("Página: " + pag);
        handleSubmit(pag);
    };

    let handleSubmit = async (pag) => {
        let params = "";
        let arrParam = [];
        arrParam.push("page=" + pag);
        if(name != ""){
            arrParam.push("name=" + name);
        }
        if(status != ""){
            arrParam.push("status=" + status);
        }
        if(species != ""){
            arrParam.push("species=" + species);
        }
        if(type != ""){
            arrParam.push("type=" + type);
        }
        if(gender != ""){
            arrParam.push("gender=" + gender);
        }
        if(arrParam.length > 0){
            params = "/?" + arrParam.join("&");
        }
        console.log(urlCharacters + params);
        try {
            let personajes = await fetch(urlCharacters + params).then((res) => res.json());
            // console.log("respuesta: " + personajes);
            if(personajes.hasOwnProperty('error')){
                setPosts([]);
            } else {
                setPosts(personajes);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <Container>
            <h1>Personajes</h1>
        
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEstatus">
                        <Form.Label>Estatus</Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option values="">Selecciona...</option>
                            <option value="alive">Vivo</option>
                            <option value="dead">Muerto</option>
                            <option value="unknown">Desconocido</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formEspecie">
                        <Form.Label>Especie</Form.Label>
                        <Form.Control type="text" placeholder="Especie" value={species} onChange={(e) => setSpecies(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formTipo">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" placeholder="Tipo" value={type} onChange={(e) => setType(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGenero">
                        <Form.Label>Género</Form.Label>
                        <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Selecciona...</option>
                            <option value="female">Mujer</option>
                            <option value="male">Hombre</option>
                            <option value="genderless">Sin género</option>
                            <option value="unknown">Desconocido</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="button" disabled={isLoading} onClick={!isLoading ? () => otraPagina(1) : null}>
                    {isLoading ? 'Consultando…' : 'Buscar'}
                </Button>
            </Form>
            {posts.hasOwnProperty('info') ? <Paginacion numPag={posts.info.pages} numRes={posts.info.count} otraPagina={otraPagina} /> : "" }
            <div>
                {posts.hasOwnProperty('results') 
                ?
                    posts.results.map((post) => {
                        return (
                            <Card style={{ width: '18rem', display: 'inline-flex', margin: '10px' }} key={post.id}>
                                <Card.Img variant="top" src={post.image} />
                                <Card.Body>
                                    <Card.Title>
                                        {post.name}
                                        {(post.status === "Alive" &&
                                            <Badge className="estatusCard" bg="success">{post.status}</Badge>)
                                        || (post.status === "Dead" &&
                                            <Badge className="estatusCard" bg="danger">{post.status}</Badge>)
                                        ||
                                            <Badge className="estatusCard" bg="secondary">{post.status}</Badge>
                                        }
                                    </Card.Title>
                                    <Card.Text style={{ textAlign: 'left', padding: '10px' }}>
                                        Especie: {post.species}<br />
                                        Tipo: {post.type}<br />
                                        Género: {post.gender}
                                    </Card.Text>
                                    <Link to={`personaje/${post.id}`}>
                                        <Button type="button" className="btn btn-primary btn-sm">Detalles</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        );
                    })
                : <div className="ob-sell-tile">Sin resultados...</div> }
            </div>
        </Container>
    )
}
export default PersonajesPage;