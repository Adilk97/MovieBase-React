import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MoviesInfo = () => {
  const { imdbID } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function getMoviesInfo() {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=96689458&i=${imdbID}`
      );

      setInfo(data);
    }
    getMoviesInfo();
  }, [imdbID]);

  return (
    <div>
      <nav>
        <div className="nav__container">
          <div className="nav__logo">
            Movie <span className="accent">Base</span>
          </div>
          <ul className="nav__links">
            <li>
              <a href="/" className="nav__link nav__home">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav__link">
                All Movies
              </a>
            </li>
            <li>
              <a href="#" className="nav__link nav__link--primary">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section id="movie">
        <div className="container">
          <div className="row">
            <div className="movie__wrapper">
              <div className="movie__left">
                <img
                  className="movie__info--img"
                  src={info.Poster}
                  alt="Poster"
                ></img>
              </div>
              <div className="movie__right">
                <h1 className="title__info">{info.Title}</h1>
                <div className="movie__info--first">
                  <h4>{info.Language}</h4>
                  <h4>{info.Genre}</h4>
                  <h4>{info.Released}</h4>
                  <h4>{info.Runtime}</h4>
                </div>
                <h3>Overview:</h3>
                <h4 className="movie__para"> {info.Plot} </h4>
                <div className="movie__info--second">
                  <h4>Director: {info.Director}</h4>
                  <h4>IMDB Rating: {info.imdbRating}</h4>
                  <h4>Metascore: {info.Metascore}</h4>
                </div>
                <h4 className="cast">Cast: {info.Actors}</h4>
                <button className="fav__btn">Favourite</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesInfo;
