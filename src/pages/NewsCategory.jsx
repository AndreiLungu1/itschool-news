import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptors";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";

export default function NewsCategory() {
  // Extrag parametru categoryId din URL
  const { categoryId } = useParams();
  // Generez link-ul pentru categoria curentta
  const newsCategoryEndpoint = getNewsCategoriesEndpoint(categoryId);
  // Fac fetch la date de la The Gueardian server
  const news = useFetch(newsCategoryEndpoint);
  // Adaptez datele primite de la server
  const adaptedNewsList = getNewsList(news);

  let pageTitle = "";
  switch (categoryId) {
    case "technology":
      pageTitle = "Tech";
      break;
    case "football":
      pageTitle = "Football";
      break;
    case "science":
      pageTitle = "Science";
      break;
    default:
      break;
  }

  return (
    <Layout>
      <Container>
        <h1 className="mb-5 pt-3">{pageTitle}</h1>
        {/* Afisez stirile despre tehnologie */}
        <NewsCardList newsList={adaptedNewsList} />
      </Container>
    </Layout>
  );
}
