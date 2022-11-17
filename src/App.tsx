import { useState, useEffect, useRef } from 'react'
import './App.css'


export default function App() {
  let [photo, setPhoto] = useState<{ id: any; urls: any; user: any }>({
    id: "",
    urls: "",
    user: "",
  });
  let [query, setQuery] = useState("tech");
  let [bio, setBio] = useState({
    first: "First",
    last: "Last",
    title: "Full Stack Web Developer",
    email: "email@gmail.com",
    phone: "+555-555-5555",
  });

  const queryInput: any = useRef(null);
  const url =
    "https://apis.scrimba.com/unsplash/photos/random/?orientation=landscape";

  useEffect(() => {
    const photoUrl = query ? `${url}&query=${query.split(" ").join("+")}` : url;
    loadData({
      url: photoUrl,
      onSuccess: (res: any) => {
        setPhoto(res);
      },
    });
  }, [query, url]);

  function searchPhotos(e: any) {
    e.preventDefault();
    setQuery(queryInput.current.value);
  }

  function loadData(options: any) {
    fetch(options.url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (options.onSuccess) options.onSuccess(data);
      });
  }

  return (
    <div className="App">
      <div className="generator">
        {query && photo.id ? (
          <div key={photo.id} className="container">
            {/* <a href={photo.user.links.html} target="_blank"> */}
            <img className="img" src={photo.urls.regular} />
            {/* </a> */}

            <div className="red-border"></div>
            <div className="right-frame">
              <h4 className="name first-name">{bio.first}</h4>
              <h4 className="name last-name">{bio.last}</h4>
              <div className="divider"></div>
              <h5 className="job-title">{bio.title}</h5>
              <h5 className="email">{bio.email}</h5>
              <h5 className="phone">{bio.phone}</h5>
            </div>

            <div className="caption">
              <span className="credits">
                Photo by
                <a href={photo.user.links.html}> {photo.user.name}</a>
                <span> on </span>
                <a href={"https://unsplash.com"}>Unsplash</a>
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}