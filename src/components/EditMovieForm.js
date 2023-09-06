import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const EditMovieForm = (props) => {
  const { push } = useHistory();
  let { id } = useParams();

  const { setMovies } = props;
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === undefined || id === null) {
      axios
        .post(`http://localhost:9000/api/movies`, movie)
        .then((res) => {
          setMovies(res.data);
          push(`/movies/${movie.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://localhost:9000/api/movies/${id}`, movie)
        .then((res) => {
          setMovies(res.data);
          push(`/movies/${movie.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //şarj bitti sjsjs tamamm tamam
  //burdan yaz şimdi göstereceğim yer doğru mu

  const { title, director, genre, metascore, description } = movie;

  useEffect(() => {
    if (id === undefined || id === null) return;

    axios
      .get("http://localhost:9000/api/movies/" + id)
      .then(function (response) {
        // handle success
        //burada get ile id si verilen filmi api den çağırıyoruz.
        //hata yosa setMovie ile bu kaydı state atıyoz. bu movie state i,; b,z,m düzenleyeceğim,z film
        //yani yaptığı doru
        setMovie(response.data);
        console.log("response=>", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("error=>", error);
      })
      .finally(function () {
        // always executed
      });
  }, [id]);

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">
            Düzenleniyor <strong>{movie.title}</strong>
          </h4>
        </div>

        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input
              value={director}
              onChange={handleChange}
              name="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre}
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input
              value={metascore}
              onChange={handleChange}
              name="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          {
            //burda bir nüans var eğer kaydı iptal etmek işterse hangi filmden gelmişse ona dönmesi lazım. yani id yazmalıyz
            //ama kayıt düzenleme değilde yeni kayıtsa listeye dönmeli onun için bir şart atalım
            //başka? delete var bir de onunda bir örneği olsa iyi olur
          }
          <Link
            to={id === undefined || id === null ? `/movies` : `/movies/${id}`}
            className="myButton bg-zinc-500"
          >
            Vazgeç
          </Link>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
