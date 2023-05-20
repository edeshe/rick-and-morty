import { 
    Container,
    Button,
    Col,
    Form,
    Row,
    Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Paginacion from "../paginacion";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const LugaresPage = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [dimension, setDimension] = useState("");
    const [posts, setPosts] = useState([]);
    const urlPlaces = "https://rickandmortyapi.com/api/location";
    const [isLoading, setLoading] = useState(false);
    const otraPagina = (pag) => {
        console.log("página: " + pag);
        setLoading(true);
        handleSubmit(pag);
    };

    let handleSubmit = async (pag) => {
        let params = "";
        let arrParam = [];
        arrParam.push("page=" + pag);
        if(name != ""){
            arrParam.push("name=" + name);
        }
        if(type != ""){
            arrParam.push("type=" + type);
        }
        if(dimension != ""){
            arrParam.push("dimension=" + dimension);
        }
        if(arrParam.length > 0){
            params = "/?" + arrParam.join("&");
        }
        console.log(urlPlaces + params);
        try {
            let lugares = await fetch(urlPlaces + params).then((res) => res.json());
            // console.log("respuesta: " + lugares);
            if(lugares.hasOwnProperty('error')){
                setPosts([]);
            } else {
                setPosts(lugares);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <Container className='container'>
            <h1>Lugares</h1>
        
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formTipo">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" placeholder="Tipo" value={type} onChange={(e) => setType(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formDimension">
                        <Form.Label>Dimensión</Form.Label>
                        <Form.Control type="text" placeholder="Dimension" value={dimension} onChange={(e) => setDimension(e.target.value)} />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="button" disabled={isLoading} onClick={!isLoading ? () => otraPagina(1) : null}>
                    {isLoading ? 'Consultando…' : 'Buscar'}
                </Button>
            </Form>
            {posts.hasOwnProperty('info') ? <Paginacion numPag={posts.info.pages} numRes={posts.info.count} otraPagina={otraPagina} /> : "" }
            <Table striped bordered hover style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Dimensión</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {posts.hasOwnProperty('results') 
                ?
                    posts.results.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.name}</td>
                                <td>{post.type}</td>
                                <td>{post.dimension}</td>
                                <td>
                                    <Link to={`../lugar/${post.id}`}>
                                        <Button type="button" className="btn btn-primary btn-sm"><AiOutlineEye /></Button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                : <tr><td colSpan={5} className="ob-sell-tile">Sin resultados...</td></tr> }
                </tbody>
            </Table>
        </Container>
    )
}
export default LugaresPage;