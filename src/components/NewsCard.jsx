import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FavoritesContext } from "../store/Favorites/context";
import "./NewsCard.css";
import { removeFromFavorites } from "../store/Favorites/actions";


export default function NewsCard(props) {
	//Extrag functia care imi modifica state-ul global 
	const { favoritesDispatch } = useContext(FavoritesContext);
	//Extrag props-urile componentei
	const { newsId, imgSrc, title, description, hasCloseButton } = props;

function handleRemoveFromFavorites(id) {
	const actionResult = removeFromFavorites(id);
	favoritesDispatch(actionResult);
}


	return (
		// La click pe card, vom deschide pagina cu detalii pentru stire
		<Card className="newsCard d-flex flex-column align-items-center justify-content-between h-100">
            {/* Caracterul / din id il deruteaza pe React Router, asa ca o sa codificam id-ul*/}
			<Link to={`/news/${encodeURIComponent(newsId)}`}>
				<Card.Img src={imgSrc} variant="top" />
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Link>
			{hasCloseButton && (
				<Button variant="light" onClick={() => {
					handleRemoveFromFavorites(newsId)
				}}><span className="materials-icons text-dark"></span></Button>
		)} 
		</Card>
	);
}
