import React, { useContext } from "react";
import Layout from "../components/Layout";
import { FavoritesContext } from "../store/Favorites/context";
import NewsCardList from "../components/NewsCardList";
import { Container } from "react-bootstrap";

export default function Favourites() {
  //Extrag state-ul global de stiri favorite
  const { favoritesState } = useContext(FavoritesContext);
  const { news } = favoritesState;
  return (
    <Layout>
      <Container className="my-5">
        <h1 className="mb-5 pt-3">Stirile tale favorite</h1>
        {/* Afisam stirile favorite pe ecran */}
        {news.length === 0 ? (
          <p>Momentan nu ai nici o stire favorita</p>
        ) : (
            <NewsCardList newsList={news} />
        )}
      </Container>
    </Layout>
  );
}
