import { useEffect } from "react";
import Pagina from "../templates/Pagina.jsx";
import { Alert } from "react-bootstrap";

export default function TelaMensagem(props){

    useEffect(()=>{
        setTimeout(()=>{
            props.setMostrarMensagem(false);
        }, 3000)
    }, []); //didMount
    
    return (
        <Pagina>
            <Alert variant={props.tipo}>
                <p>{props.mensagem}</p>
            </Alert>
        </Pagina>
    );
}