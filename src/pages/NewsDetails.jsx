import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetails } from "../api/adaptors";
import { getFormattedDate } from "../utils/date";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./newsDetails.css";
import { addToFavorite } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import { favoritesState } from "../pages/Favourites";

export default function NewsDetails() {
  //Extrag functia care imi modifica state-ul global de stiri favorite
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);
  // extrag newsId
  let { newsId } = useParams();
  //Avand in vedere ca am codificat id-ul in NewsCard.jsx, acum trebuie sa il decodific ca sa il pot trimite API
  newsId = decodeURIComponent(newsId);
  //Generez endpoint-ul pentru detaliile stirii
  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
  //Cerem datele stirii de la server
  const newsDetails = useFetch(newsDetailsEndpoint);
  //Adaptez datele de la server in functie de datele necesare componentei
  const adaptedNewsDetails = getNewsDetails(newsDetails);
  // Extrag cheile din adaptedNewsDetails folosind object destructuring
  const { title, description, image, date, author, content, thumbnail } =
    adaptedNewsDetails;
  // Formatez data primita de la API catre formatul: zi/luna/an
  const formattedDate = getFormattedDate(date);

  const [showAlert, setShowAlert] = useState(false);
  // Extragem functia de modificare a localStorage-ului. Nu avem nevoie de state-ul din localStorage, conventia este ca pentru variabile neutilizate sa punem denumirea .
  const [_, setLocalStorageState] = useLocalStorage(
    "favorites",
    favoritesState
  );
  // Adaugarea in localStorage este un efect, atunci cand se modifica produsele favorite.
  // Cum stim ca s-au modificat produsele favorite? Primim o noua valoare a lui favoritesState.
  // setLocalStorageState este sugerat sa fie adaugat la dependente de o regula de lining.
  useEffect(() => {
    setLocalStorageState(favoritesState)
  }, [favoritesState, setLocalStorageState]);

  function handleAddToFavorites(news) {
    // Apelez actiunea de adaugare la favorite
    const actionResult = addToFavorite(news);
    //Trimit rezultatul actiunii catre reducer
    favoritesDispatch(actionResult);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  console.log(showAlert);
  console.log(handleAddToFavorites);

  return (
    <Layout>
      <Container className="newsDetails my-5">
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            {/* De la API noi primim imaginea sub forma de tag-uri de HTML iar pentru a le afisa pe ecran in React avem nevoie de prop-ul dangerouslySetInnerHTML care este echivalentul innerHTML din JavaScript */}
            <div
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button
                onClick={() => {
                  //Construiesc payload-ul actiunii de adaugare stire la favorite
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });
                }}
              >
                Adauga la favorite
              </Button>
            </div>
            {/* Inserez tot cu dangerouslySetInnerHTML continutul stirii - pentru ca API-ul imi returneaza fields.body cu tag-uri de HTML */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
      {showAlert && (
        <div
          className="alert alert-success fixed-top w-100 text-center"
          role="alert"
        >
          Produsul a fost adaugat la favorite
        </div>
      )}
    </Layout>
  );
}
