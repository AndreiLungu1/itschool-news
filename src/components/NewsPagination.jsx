import { useNavigate } from "react-router-dom";
import "./NewsPagination.css";
import Pagination from 'react-bootstrap/Pagination';

export default function NewsPagination (props) {
    // Extrag props-urile
    let {active, baseUrl} = props;
    // Folosesc hook-ul de useNavigate
    let navigate = useNavigate();
    // Daca nu primesc nicio valoare pentru prop-ul active, atunci inseamna ca pagina activa va fi 1
    if (!active) {
        active = 1;
    }
    let items = [];
    // vom avea 5 componente de paginatie si atunci folosind instructiunea 'for' iterez de 5 ori ca sa pot construi array-ul items cu 5 elemente 
    for (let number = 1; number <= 5; number++) {
        items.push(
        <Pagination.Item 
            key={number}
            // prop-ul active va avea valoarea true daca pagina curenta este cea activa
            active={number === Number(active)}
            // Daca pagina este activa, ii adaug un id pentru stilizare
            id={active? "pagination-active" : null}
            onClick={() => {
                // La click pe buton navigam catre noua pagina
                navigate(`${baseUrl}?page=${number}`);
                // Scrolez inapoi sus in pagina
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }}
        >{number}</Pagination.Item>
        );
    }
 
     return (
        <div className="d-flex justify-content-center">
            <Pagination className="pagination">{items}</Pagination>
        </div>
    );
}