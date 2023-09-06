import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import axios, { AxiosHeaders } from "axios";

const Movie = (props) => {
  const { addToFavorites, setMovies } = props;

  const [movie, setMovie] = useState("");

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  const handleDeleteMovie = () => {
    //burda id'si verilen filmi silecez

    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovies(res.data);
        push(`/movies`);
        //sildikten sonra listeye dönmesi için
        //mantık anlaşıldı m?evet anladım mantığını ben readme kısmını okuyamadım projeyi de senin gibi yorumlayamıyorum tıkanmıştım ama genel mnatık oturdu
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <div className="p-5 pb-3 border-b border-zinc-200">
        <h4 className="text-xl font-bold">{movie.title} Detayları</h4>
      </div>
      <div className="px-5 py-3">
        <div className="py-1 flex">
          <div className="view-label">İsim</div>
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Yönetmen</div>
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Tür</div>
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Metascore</div>
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Açıklama</div>
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 flex justify-end gap-2">
        <button className="myButton bg-blue-600 hover:bg-blue-500 ">
          Favorilere ekle
        </button>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="myButton bg-blue-600 hover:bg-blue-500"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDeleteMovie}
          className="myButton bg-red-600 hover:bg-red-500"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default Movie;

//
// crud create read update    delete
// ---- post   get  put/patch delete <-- http req. ttypes
// get ile ekrana listele
// bir ekran tasarlanır ve kayıt ekleme işi yapar post ile. kayıt ekleme başarılı ise kaydı açar veya listelemeye geri döner.
// kayıt detayına tıklanınca kayıtın tüm bilgileri getirilir.
// getirilen kayıt güncellenmek istenirse. katdı güncelle ekranına yönlendir.
// silme için bir onay kutusu. sonra listeye dön.
