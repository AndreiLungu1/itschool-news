import React from "react";
import Layout from "../components/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptors";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";
import NewsPagination from "../components/NewsPagination";

export default function NewsCategory() {
  // Extrag parametru categoryId din URL
  const { categoryId } = useParams();
  // Extrag query params din url
  const [queryParams] = useSearchParams();
  let currentPage = queryParams.get("page");
  //Daca nu avem queryParams in URL - inseamna ca suntem pe pagina principala de categorie 
  if (!currentPage) {
    currentPage = 1;
  }
  // Generez link-ul pentru categoria curentta
  const newsCategoryEndpoint = getNewsCategoriesEndpoint(categoryId, currentPage);
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
        {/* Afisam paginarea */}
        <NewsPagination active={currentPage} baseUrl={`/category/${categoryId}`} />
      </Container>
    </Layout>
  );
}
