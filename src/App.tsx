import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./Form.css";
import html2canvas from "html2canvas";
import { nanoid } from "nanoid";
import Footer from "./components/Nav/Footer";
import Nav from "./components/Nav/Nav";
import logo from "./logo.png";

export default function App() {
  let [photo, setPhoto] = useState<{ id: any; urls: any; user: any }>({
    id: "",
    urls: "",
    user: "",
  });

  let queries = ["tech", "neon", "cyber", "city"];
  function randomQuery(list: []) {
    return Math.floor(Math.random() * list.length);
  }

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

  const fontFamilies = [
    "Arial",
    "Calibri",
    "Inconsolata",
    "Noto Sans HK",
    "Merriweather",
    "Lobster",
    "Sora",
    "Lato",
    "Montserrat",
  ];
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

  useEffect(() => {
    setImage(photo.urls.regular);
  }, [photo]);

  function generatePhoto() {
    const photoUrl = formData.query
      ? `${url}&query=${formData.query.split(" ").join("+")}`
      : url;
    loadData({
      url: photoUrl,
      onSuccess: (res: any) => {
        setPhoto(res);
      },
    });
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

  function saveImg(fileType: string) {
    html2canvas(document.getElementById("capture") as HTMLCanvasElement, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      let anchorTag = document.createElement("a");
      document.body.appendChild(anchorTag);

      if (fileType === "jpg") {
        anchorTag.href = canvas.toDataURL("image/jpeg");
      } else if (fileType === "png") {
        anchorTag.href = canvas.toDataURL();
      } else if (fileType === "webp") {
        anchorTag.href = canvas.toDataURL("image/webp");
      }

      anchorTag.download = `cover-img.${fileType}`;
      anchorTag.target = "_blank";
      anchorTag.click();
    });
  }

  function updateColor(color: string) {}

  function handleUpload(e: any) {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log("test");
  }

  const [image, setImage] = useState("");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(275);
  const [opacity, setOpacity] = useState(1);

  const coverImageSizes = {
    "Social Media": {
      Facebook: { min: 400, max: 828 },
      Twitter: { min: 440, max: 4096 },
      LinkedIn: { min: 1536, max: 1536 },
      Instagram: { min: 320, max: 1080 },
    },
    "E-commerce": {
      Amazon: { min: 500, max: 2560 },
      Etsy: { min: 500, max: 4000 },
    },
    "Online video platforms": {
      YouTube: { min: 640, max: 3840 },
      Vimeo: { min: 640, max: 4096 },
    },
    "Website banners": {
      min: 800,
      max: 1920,
    },
    "Email marketing": {
      min: 600,
      max: 600,
    },
    "Book Covers": {
      Kindle: { min: 800, max: 2560 },
      Print: { min: 1250, max: 2500 },
    },
  };

  return (
    <div className="App">
      {/* <Nav /> */}
      <div className="title-banner">
        <h1 className="app-title"> Cover Image Generator</h1>
      </div>

      <div className="content-wrapper">
        <div
          className="cover-container"
          id="capture"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {formData.query && photo ? (
            <div>
              <div
                className="img-wrapper"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
              >
                <img className="img" src={image} />
              </div>

              <div className="cover-border">
                {formData.displayInfo ? (
                  <div
                    className="info-frame"
                    style={{
                      color: formData.clrFont,
                      backgroundColor: formData.clrBg,
                      fontFamily: formData.font,
                      opacity: opacity,
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
        </div>

        <div className="controls-banner">
          <form onSubmit={handleSubmit} className="controls">
            <div className="img-form">
              <p className="control-header">File</p>
              <div className="form-row">
                <p className="form-label">Import Image</p>
                <input
                  className="form-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleUpload}
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
              {/* <div className="caption">
                {formData.query && photo.id ? (
                  <p className="credits">
                    Photo by
                    <a href={photo.user.links.html}> {photo.user.name}</a>
                    <span> on </span>
                    <a href={"https://unsplash.com"}>Unsplash</a>
                  </p>
                ) : (
                  <></>
                )}
              </div> */}
              <div className="btn-wrapper">
                <button
                  className="form-btn"
                  onClick={() => {
                    saveImg(formData.fileType);
                  }}
                >
                  Download
                </button>
              </div>
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
              {/* <div className="form-row">
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
              </div> */}

              <SliderInput
                className="input-slider"
                value={width}
                onChange={(e: any) => setWidth(e.target.value)}
                min={400}
                max={1600}
                label="Width"
              />
              <SliderInput
                className="input-slider"
                value={height}
                onChange={(e: any) => setHeight(e.target.value)}
                min={150}
                max={600}
                label="Height"
              />

              <div className="btn-wrapper">
                <button className="form-btn" onClick={generatePhoto}>
                  Generate
                </button>
              </div>
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

              <SliderInput
                className="input-slider"
                value={(opacity * 100).toFixed(0)}
                onChange={(e: any) => setOpacity(e.target.value / 100)}
                min={0}
                max={100}
                step={1}
                label="Opacity"
              />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function SliderInput(props: any) {
  return (
    <div className={props.className}>
      <label>{props.label}</label>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
      />
      <label>{props.value}</label>
    </div>
  );
}
