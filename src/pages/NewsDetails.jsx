import React, { useContext } from "react";
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

export default function NewsDetails() {
	//Extrag functia care imi modifica state-ul global de stiri favorite
	const { favoritesDispatch } = useContext(FavoritesContext);
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

  function handleAddToFavorites(news) {
	// Apelez actiunea de adaugare la favorite
	const actionResult = addToFavorite(news);
	//Trimit rezultatul actiunii catre reducer
	favoritesDispatch(actionResult);
  }

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
			  <Button onClick={() => {
				//Construiesc payload-ul actiunii de adaugare stire la favorite
				handleAddToFavorites({
					id: newsId,
					thumbnail,
					title,
					description,
					hasCloseButton: true,
				})
			  }}>Adauga la favorite</Button>
            </div>
			{/* Inserez tot cu dangerouslySetInnerHTML continutul stirii - pentru ca API-ul imi returneaza fields.body cu tag-uri de HTML */}
			<div dangerouslySetInnerHTML={{__html: content}}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
