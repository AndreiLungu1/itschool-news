import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";
import { Link } from "react-router-dom";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptors";

export default function Home() {
  // Generez endpoint-urile pentru categoriile de stiri
  const technologyNewsEndpoint = getNewsCategoriesEndpoint("technology", 1, 6);
  const footballNewsEndpoint = getNewsCategoriesEndpoint("football", 1, 6);
  const scienceNewsEndpoint = getNewsCategoriesEndpoint("science", 1, 6);
  // Fetch-uim datele de la The Guardian
  let technologyData = useFetch(technologyNewsEndpoint);
  let footballData = useFetch(footballNewsEndpoint);
  let scienceData = useFetch(scienceNewsEndpoint);
  // Adaptez datale primite de la server
  const adaptedTechnologyData = getNewsList(technologyData);
  const adaptedFootballData = getNewsList(footballData);
  const adaptedScienceData = getNewsList(scienceData);

  return (
    <Layout>
      <section className="tech my-5">
        <Container>
          <h1 className="mb-5 pt-3">Tech</h1>
          {/* Afisez stirile despre tehnologie */}
          <NewsCardList newsList={adaptedTechnologyData} />
          <p>
            Vezi toate stirile legate de tehnologie in sectiunea:{" "}
            <Link to="/category/technology" className="text-secondary">
              Tech
            </Link>
          </p>
        </Container>
      </section>
      <section className="football my-5">
        <Container>
          <h1 className="mb-5 pt-3">Football</h1>
          {/* Afisez stirile despre fotbal */}
          <NewsCardList newsList={adaptedFootballData} />
          <p>
            Vezi toate stirile legate de Fotbal in sectiunea:{" "}
            <Link to="/category/football" className="text-secondary">
              Football
            </Link>
          </p>
        </Container>
      </section>
      <section className="science my-5">
        <Container>
          <h1 className="mb-5 pt-3">Science</h1>
          <NewsCardList newsList={adaptedScienceData} />
          <p>
            Vezi toate stirile legate de Stiinta in sectiunea:{" "}
            <Link to="/category/science" className="text-secondary">
              Science
            </Link>{" "}
          </p>
        </Container>
      </section>
      <section className="favorites my-5">
        <Container>
          <h1 className="mb-5 pt-3">Favorite</h1>
          <p>Vrei sa salvezi stirile favorite pentru a le citi mai incolo?</p>
          <p>
            In cadrul fiecarei stiri gasesti un buton prin care poti adauga
            stirea la favorite
          </p>
          <p className="pb-3">
            Viziteaza sectiunea{" "}
            <Link to="/favourites" className="text-secondary">
              Favorite
            </Link>{" "}
            pentru a vedea stirile adaugate ca si favorite
          </p>
        </Container>
      </section>
    </Layout>
  );
}
