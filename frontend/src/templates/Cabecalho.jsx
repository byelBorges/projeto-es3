import { Alert } from "react-bootstrap";
//Componente que deve receber um prooriedade conteúdo
//
export default function Cabecalho(props) {

    return (
        <header>
            <Alert variant="info" className={'text-center'}>
                {props.conteudo || "sistema"}
            </Alert>
        </header>
    );
}