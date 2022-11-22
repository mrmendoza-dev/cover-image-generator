import { useState, useEffect, useRef } from 'react'
import './App.css'
import "./Form.css";
import html2canvas from "html2canvas";
// const html2canvas = require("html2canvas");
import {nanoid} from "nanoid";

export default function App() {
  let [photo, setPhoto] = useState<{ id: any; urls: any; user: any }>({
    id: "",
    urls: "",
    user: "",
  });

  let queries = ["tech", "neon", "cyber"];

    const [formData, setFormData] = useState({
      name: "John Doe",
      title: "Web Developer",
      email: "email@gmail.com",
      phone: "+555-555-5555",
      site: "www.personalsite.com",

      width: 1075,
      height: 275,
      query: "cyber",
      fileType: "png",
      displayInfo: true,

      font: "Noto Sans HK",
      clrAccent: "#00A0DC",
      clrBg: "#000000d9",
      clrFont: "#ffffff",
    });

    const fontFamilies = ['Arial', 'Calibri', 'Inconsolata', 'Noto Sans HK', 'Merriweather', 'Lobster', 'Old Standard TT', 'Sora', 'Lato', 'Montserrat', 'Courier'];
    function handleChange(event: any) {
      const { name, value, type, checked } = event.target;
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }

    function handleSubmit(event: any) {
      event.preventDefault();
      // submitToApi(formData)
    }


  const queryInput: any = useRef(null);
  const url =
    "https://apis.scrimba.com/unsplash/photos/random/?orientation=landscape";

  useEffect(() => {
    generatePhoto();
  }, [url]);

  function generatePhoto() {
    const photoUrl = formData.query ? `${url}&query=${formData.query.split(" ").join("+")}` : url;
    loadData({
      url: photoUrl,
      onSuccess: (res: any) => {
        setPhoto(res);
      },
    });
  }

  function searchPhotos(e: any) {
    e.preventDefault();
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

  // html2canvas(document.querySelector("#capture")).then((canvas) => {
  //   document.body.appendChild(canvas);
  // });


 function saveImg() {
   html2canvas(document.getElementById("capture") as HTMLCanvasElement, {
     allowTaint: true,
     useCORS: true,
   }).then(function (canvas) {
     var anchorTag = document.createElement("a");
     document.body.appendChild(anchorTag);
     //  document.getElementById("previewImg").appendChild(canvas);
     anchorTag.download = `cover-img.${formData.fileType}`;
     anchorTag.href = canvas.toDataURL();
     anchorTag.target = "_blank";
     anchorTag.click();
   });
 }

 function updateColor(color: string) {
   
 }

 
  return (
    <div className="App">
      <h1 className="app-title"> Cover Image Generator</h1>
      {formData.query && photo.id ? (
        <div key={photo.id} className="cover-container" id="capture">
          {/* <a href={photo.user.links.html} target="_blank"> */}
          <div className="img-wrapper">
            <img className="img" src={photo.urls.regular} />
          </div>
          {/* </a> */}

          <div className="cover-border">
            {formData.displayInfo ? (
              <div
                className="info-frame"
                style={{
                  color: formData.clrFont,
                  backgroundColor: formData.clrBg,
                  fontFamily: formData.font,
                }}
              >
                <h4 className="name">{formData.name}</h4>
                <div
                  className="divider"
                  style={{
                    backgroundColor: formData.clrAccent,
                  }}
                ></div>
                <h5 className="job-title">{formData.title}</h5>
                <h5 className="email">{formData.email}</h5>
                <h5 className="phone">{formData.phone}</h5>
                <h5 className="site">{formData.site}</h5>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit} className="controls">
        <div className="img-form">
          <p className="control-header">File</p>
          <div className="form-row">
            <p className="form-label">Import Image</p>
            <input
              className="form-input"
              type="file"
              accept="image/png, image/jpeg"
              // placeholder="Website"
              onChange={handleChange}
              // name="site"
              // value={formData.site}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Display Info</p>
            <input
              className="form-checkbox"
              type="checkbox"
              checked={formData.displayInfo}
              onChange={handleChange}
              name="displayInfo"
            />
          </div>
          <div className="form-row">
            <p className="form-label">File Type</p>

            <select
              className="form-select"
              onChange={handleChange}
              name="fileType"
              value={formData.fileType}
            >
              <option value="png">.png</option>
              <option value="jpg">.jpg</option>
              <option value="webp">.webp</option>
            </select>
          </div>
          <button className="form-btn" onClick={saveImg}>
            Download
          </button>
        </div>

        <div className="info-form">
          <p className="control-header">Info</p>
          <div className="form-row">
            <p className="form-label">Name</p>
            <input
              className="form-input"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Title</p>
            <input
              className="form-input"
              type="text"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              value={formData.title}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Phone</p>
            <input
              className="form-input"
              type="text"
              placeholder="Phone"
              onChange={handleChange}
              name="phone"
              value={formData.phone}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Email</p>
            <input
              className="form-input"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Website</p>
            <input
              className="form-input"
              type="text"
              placeholder="Website"
              onChange={handleChange}
              name="site"
              value={formData.site}
            />
          </div>
        </div>

        <div className="img-form">
          <p className="control-header">Generate</p>
          <div className="form-row">
            <p className="form-label">Category</p>
            <input
              className="form-input"
              type="text"
              // placeholder=""
              onChange={handleChange}
              name="query"
              value={formData.query}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Width</p>
            <input
              className="form-input"
              type="number"
              // placeholder="First Name"
              onChange={handleChange}
              name="width"
              value={formData.width}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Height</p>
            <input
              className="form-input"
              type="number"
              // placeholder="First Name"
              onChange={handleChange}
              name="height"
              value={formData.height}
            />
          </div>
          <button className="form-btn" onClick={generatePhoto}>
            Generate
          </button>
        </div>

        <div className="style-form">
          <p className="control-header">Styling</p>
          <div className="form-row">
            <p className="form-label">Font Family</p>

            <select
              className="form-select"
              onChange={handleChange}
              name="font"
              value={formData.font}
            >
              {fontFamilies.map((font: any) => {
                return (
                  <option key={nanoid()} value={font}>
                    {font}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <p className="form-label">Accent</p>
            <input
              name="clrAccent"
              type="color"
              className="color-picker"
              onChange={handleChange}
              value={formData.clrAccent}
            />
            <input
              className="form-input"
              type="text"
              onChange={handleChange}
              name="clrAccent"
              value={formData.clrAccent}
            />
          </div>

          <div className="form-row">
            <p className="form-label">Font</p>
            <input
              name="clrFont"
              type="color"
              className="color-picker"
              onChange={handleChange}
              value={formData.clrFont}
            />
            <input
              className="form-input"
              type="text"
              onChange={handleChange}
              name="clrFont"
              value={formData.clrFont}
            />
          </div>
          <div className="form-row">
            <p className="form-label">Background</p>
            <input
              name="clrBg"
              type="color"
              className="color-picker"
              onChange={handleChange}
              value={formData.clrBg}
            />
            <input
              className="form-input"
              type="text"
              onChange={handleChange}
              name="clrBg"
              value={formData.clrBg}
            />
          </div>
        </div>
      </form>
    </div>
  );
}





            // <div className="caption">
            //   <span className="credits">
            //     Photo by
            //     <a href={photo.user.links.html}> {photo.user.name}</a>
            //     <span> on </span>
            //     <a href={"https://unsplash.com"}>Unsplash</a>
            //   </span>
            // </div>;