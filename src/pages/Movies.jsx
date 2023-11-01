import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import movieImg from "../assets/movie_night.svg";

const Movies = () => {
  let navigate = useNavigate();
  const { imdbID } = useParams();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(imdbID || "");
  const [sortOrder, setSortOrder] = useState("DEFAULT");
  const [loading, setLoading] = useState(false);

  function onSearch() {
    fetchMovies(search);
  }

  function filterMovies(filter) {
    setSortOrder(filter);
  }

  async function fetchMovies() {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=96689458&s=${search || imdbID}`
    );
    setLoading(false);
    setMovies(data.Search || []);
  }

  useEffect(() => {
    let sortedMovies = [...movies];

    if (sortOrder === "LOW_TO_HIGH") {
      sortedMovies.sort((a, b) => a.Year - b.Year);
    } else if (sortOrder === "HIGH_TO_LOW") {
      sortedMovies.sort((a, b) => b.Year - a.Year);
    }

    setMovies(sortedMovies);
  }, [sortOrder]);

  return (
    <div>
      <section>
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
      </section>
      <div className="container__landing">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__left">
              <h1 className="big__header">
                Millions of Movies at your fingertips!
              </h1>
              <div className="search__box">
                <input
                  className="search__input"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyPress={(event) => event.key === "Enter" && onSearch()}
                />
                <button type="submit" onClick={() => onSearch()}>
                  Search
                </button>
              </div>
            </div>
            <div className="landing__right">
              <img
                className="illustration__img"
                src={movieImg}
                alt="illustration"
              ></img>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="container">
          <div className="row">
            <div className="movies__grid-skeleton-container">
              {new Array(5).fill(0).map((_, index) => (
                <div key={index} className="movies__grid--skeleton">
                  <div className="movie__img--skeleton"></div>
                  <div className="skeleton movie__title--skeleton"></div>
                  <div className="skeleton movie__rating--skeleton"></div>
                  <div className="skeleton movie__price--skeleton"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          {movies.length > 0 && (
            <div className="filter__box">
              <select
                id="filter"
                defaultValue="DEFAULT"
                onChange={(event) => filterMovies(event.target.value)}
              >
                <option value="DEFAULT">Sort</option>
                <option value="LOW_TO_HIGH">Year - Low to High</option>
                <option value="HIGH_TO_LOW">Year - High to Low</option>
              </select>
            </div>
          )}
          <div className="row">
            <div className="movies__grid">
              {movies.map((movie) => (
                <div key={movie.imdbID} className="movies__card">
                  <img
                    onClick={() => navigate(`${movie.imdbID}`)}
                    className="movie__img"
                    src={movie.Poster}
                    alt=""
                  />
                  <h3 className="movie__title">{movie.Title}</h3>
                  <h3 className="movie__year">{movie.Year}</h3>
                  <h3 className="movie__type">{movie.Type}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
