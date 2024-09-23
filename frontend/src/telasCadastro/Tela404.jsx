import { Alert, Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";

export default function Tela404(props) {
    return (
        <Container>
            <Pagina>
                <Alert variant="danger">
                    O sistema não oferece acesso a essa página.
                    Utilize o Menu para acessar as opções válidas.
                </Alert>
            </Pagina>
        </Container>
    );
}