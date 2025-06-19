import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './css/Home.css';

const Home = () => {
  const [mediaByType, setMediaByType] = useState({});
  const [loading, setLoading] = useState(true);
  const [topFilms, setTopFilms] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [topMangas, setTopMangas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/media`, { 
          headers: { 'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des médias');
        }
        const data = await response.json();

        // Organiser les médias par type et filtrer ceux avec status true
        const mediaByType = data.reduce((acc, media) => {
          if (media.status === true) {
            if (!acc[media.type]) {
              acc[media.type] = [];
            }
            acc[media.type].push(media);
          }
          return acc;
        }, {});


        // mettre en place le 1er premier média de chaque type en fonction du score
        const topFilms = mediaByType.film && mediaByType.film.reduce((acc, film) => (film.score > acc.score ? film : acc), mediaByType.film[0]);
        const topSeries = mediaByType.serie && mediaByType.serie.reduce((acc, serie) => (serie.score > acc.score ? serie : acc), mediaByType.serie[0]);
        const topMangas = mediaByType.manga && mediaByType.manga.reduce((acc, manga) => (manga.score > acc.score ? manga : acc), mediaByType.manga[0]);

        setMediaByType(mediaByType);
        setTopFilms(topFilms);
        setTopSeries(topSeries);
        setTopMangas(topMangas);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMedias();
  }, []);

  if (loading) {
    return <p>Chargement des médias...</p>;
  }

  // Paramètres du slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="home-container">
      <header className="welcome-section">
        <h1>Bienvenue sur Films & Séries & Mangas</h1>
        
        {/* Slider d'images avec 2 posters par catégorie */}
        <Slider {...sliderSettings}>
          {Object.keys(mediaByType).map((type) =>
            mediaByType[type].slice(0, 2).map((media) => (
              <div key={media.id} className="slider-item">
                <img src={`/img/${media.imageUrl}`} alt={media.title} className="slider-image" />
                <p>{media.title}</p>
              </div>
            ))
          )}
        </Slider>

        <button className="explore-button" onClick={() => navigate("/media")}>
          Explorez maintenant
        </button>
      </header>

      <section className="categories-section">
        <h2>Nos Catégories</h2>
        <div className="categories">
          <div className="category">
            <h3>Films</h3>
            <p>Découvrez les derniers blockbusters et les classiques du cinéma.</p>
          </div>
          <div className="category">
            <h3>Séries</h3>
            <p>Plongez dans des histoires captivantes et des séries incontournables.</p>
          </div>
          <div className="category">
            <h3>Mangas</h3>
            <p>Explorez des mangas populaires et des nouveautés en provenance du Japon.</p>
          </div>
        </div>
      </section>

      <section className="recommendations-section">
        <h2>Recommandations Populaires</h2>
        <div className="recommendations">
          {mediaByType.film && (
            <div className="recommendation">
              <img src={`/img/${topFilms.imageUrl}`} alt={`Poster de ${topFilms.title}`} />
              <p>{topFilms.title}</p>
            </div>
          )}
          {mediaByType.serie && (
            <div className="recommendation">
              <img src={`/img/${topSeries.imageUrl}`} alt={`Poster de ${topSeries.title}`} />
              <p>{topSeries.title}</p>
            </div>
          )}
          {mediaByType.manga && (
            <div className="recommendation">
              <img src={`/img/${topMangas.imageUrl}`} alt={`Poster de ${topMangas.title}`} />
              <p>{topMangas.title}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
