import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import feinlerImg from "./assets/feinler.jpg";
import bernersLeeImg from "./assets/lee.jpg";
import tomlinsonImg from "./assets/tomlinson.jpg";

const pioneers = [

    {
        name: "Elizabeth Feinler",
        img: feinlerImg,
        age: 58,
        knownFor: "Elizabeth Feinler is a pioneering computer scientist who managed the ARPANET directory and helped develop the domain name system (.com, .gov, .edu), laying the groundwork for how we navigate the internet today.",
    },
    {
        name: "Tim Berners-Lee",
        img: bernersLeeImg,
        age: 69,
        knownFor: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN, creating HTML, HTTP, and the first web browser, fundamentally transforming how humanity communicates and shares information.",
    },
    {
        name: "Ray Tomlinson",
        img: tomlinsonImg,
        age: 74,
        knownFor: "Ray Tomlinson sent the first networked email in 1971 and chose the @ symbol to separate usernames from host names — a convention that remains the global standard for email addresses to this day.",
    },

];

function HomePage({ onSelect, viewed }) {

    return (

        <div className="container py-4">
            <h1 className="mb-4">Internet Pioneers Bios</h1>
            <div className="row g-4">
                {pioneers.map((pioneer) => (
                <div className="col-sm-6 col-md-4" key={pioneer.name}>
                    <div
                    className="card h-100 position-relative"
                    onClick={() => onSelect(pioneer)}
                    style={{ cursor: "pointer" }}
                    >
                    <img
                        src={pioneer.img}
                        alt={pioneer.name}
                        className="card-img-top"
                        style={{ objectFit: "cover", height: "400px" }}
                    />
                    {viewed.has(pioneer.name) && (
                        <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-danger">Viewed</span>
                        </div>
                    )}
                    <div className="card-body">
                        <h2 className="card-title h5">{pioneer.name}</h2>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        
    );

}

function PioneerPage({ pioneer, onBack }) {

    return (

        <div className="bg-secondary">
            <div className="container py-5 px-5" style={{ maxWidth: "600px" }}>
                <h2 className="mb-3 text-white">{pioneer.name}</h2>
                <img
                src={pioneer.img}
                alt={pioneer.name}
                className="img-fluid mb-3"
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                />
                <ul className="list-group mb-4">
                <li className="list-group-item bg-secondary text-white border-0">
                    <strong>Age:</strong> {pioneer.age}
                </li>
                <li className="list-group-item bg-secondary text-white border-0">
                    <strong>Known For:</strong> {pioneer.knownFor}
                </li>
                </ul>
                <button className="btn btn-primary" onClick={onBack}>
                Back to Directory
                </button>
            </div>
        </div>

    );

}

function App() {

    const [selected, setSelected] = useState(null);
    const [viewed, setViewed] = useState(new Set());

    const handleSelect = (pioneer) => {
        setViewed((prev) => new Set(prev).add(pioneer.name));
        setSelected(pioneer);
    };

    return selected ? (
        <PioneerPage pioneer={selected} onBack={() => setSelected(null)}/>
    ) : (
        <HomePage onSelect={handleSelect} viewed={viewed}/>
    );

}

export default App;