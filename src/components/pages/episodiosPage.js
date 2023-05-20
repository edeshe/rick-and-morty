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

const EpisodiosPage = () => {
    const [pagina, updatePagina] = useState(1);
    const [name, setName] = useState("");
    const [episode, setEpisode] = useState("");
    const [posts, setPosts] = useState([]);
    const urlEpisodes = "https://rickandmortyapi.com/api/episode";
    const [isLoading, setLoading] = useState(false);
    const otraPagina = (pag) => {
        console.log("Página: " + pag);
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
        if(episode != ""){
            arrParam.push("episode=" + episode);
        }
        if(arrParam.length > 0){
            params = "/?" + arrParam.join("&");
        }
        console.log(urlEpisodes + params);
        try {
            let episodios = await fetch(urlEpisodes + params).then((res) => res.json());
            if(episodios.hasOwnProperty('error')){
                setPosts([]);
            } else {
                setPosts(episodios);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <Container className='container'>
            <h1>Episodios</h1>
        
            <Form>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEpisodio">
                        <Form.Label>Episodio <small>(Código)</small></Form.Label>
                        <Form.Control type="text" placeholder="Episodio" value={episode} onChange={(e) => setEpisode(e.target.value)} />
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
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Lanzamiento</th>
                        <th>Episodio</th>
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
                                <td>{post.air_date}</td>
                                <td>{post.episode}</td>
                                <td>
                                    <Link to={`../episodio/${post.id}`}>
                                        <Button type="button" className="btn btn-primary btn-sm"><AiOutlineEye /></Button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })
                : <tr><td colSpan={4} className="ob-sell-tile">Sin resultados...</td></tr> }
                </tbody>
            </Table>
        </Container>
    )
}
export default EpisodiosPage