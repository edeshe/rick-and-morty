import { useState } from "react";

import { 
    Container,
    Button,
    Col,
    Row,
 } from "react-bootstrap";

const Paginacion = ({numPag, numRes, otraPagina}) => {
    let arrPaginas = [];

    // if(numPag > 1){
        for (let i = 1; i <= numPag; i++) {
            arrPaginas.push(i);
        }
    // }
    return(
        <Container className="contPaginacion">
            <Row>
                <Col style={{ textAlign: "left" }} sm={2}>Resultados: {numRes}</Col>
                <Col sm={8}>
                    {arrPaginas.map((id) => {
                        return (
                            <Button 
                                variant="secondary" 
                                key={id}
                                onClick={() => otraPagina(id)}
                            >
                            {id}</Button>
                        );
                    })}
                </Col>
                <Col style={{ textAlign: "right" }} sm={2}>Paginas: {numPag}</Col>
            </Row>
        </Container>
    )
};

export default Paginacion;