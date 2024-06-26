import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
// import Form from "./Form.js";
import { Route, Link, NavLink } from "react-router-dom";
// import Home from "./pages/Home.js";
import { useGlobalContext } from "./context.js";
import axios from "axios";
import Loading from "./Loading.js";
import data from "./datacrops.js";
import Footer from "./Footer.js";
// import Loading from "./Loading.js";
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
const Home = () => {
  const [toggle, setToggle] = useState(0);
  const [toggle2, setToggle2] = useState(0);
  const [form, setForm] = useState(0);
  const [profile, setProfile] = useState(1);
  const { lat, lon, setLat, setLon } = useGlobalContext();
  let t1, t2;
  const { name, email, name2, email2, setName, setEmail, polygon_id, setId } =
    useGlobalContext();
  const [rem, setRem] = useState(0);
  // const { polygon_id, setId } = useGlobalContext();
  const [loading, setLoading] = useState(1);
  const [found, setFound] = useState(0);
  const [done, setDone] = useState(0);
  const [lat1, setLat1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lat3, setLat3] = useState("");
  const [lat4, setLat4] = useState("");
  const [lon1, setLon1] = useState("");
  const [lon2, setLon2] = useState("");
  const [lon3, setLon3] = useState("");
  const [lon4, setLon4] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [options, setOptions] = useState([]);
  const [you, setYou] = useState(1);
  const [friends, setFriends] = useState([]);
  const Navigate = useNavigate();
  const clickHandler = async (name) => {
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    var id_now;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      console.log(foundUser);
    }
    const p = localStorage.getItem("polygon");
    if (p) {
      const foundUser = JSON.parse(p);
      id_now = foundUser.polygon_id;
    }
    let s1 = `${process.env.REACT_APP_BACKEND}/user/localcrops`;
    const requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const val = JSON.stringify({
      name: name,
      email: email,
      polygon_id: id_now,
    });
    console.log(val);
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      if (d.data !== "Failed") setFarmers(d.data);
      else {
        // console.log("adfoiweaog");
        setFarmers([]);
      }
      console.log("Hellooo", d.data);
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
    setYou(0);
  };

  const fetchFarmers = async () => {
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    var id_now;
    let name, email;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // console.log(foundUser);
      accesstoken = foundUser.token;
      name = foundUser.name;
      email = foundUser.email;
    }
    const p = localStorage.getItem("polygon");
    if (p) {
      const foundUser = JSON.parse(p);
      id_now = foundUser.polygon_id;
    }
    // console.log(polygon_id);
    let s1 = `${process.env.REACT_APP_BACKEND}/user/farmer`;
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    console.log(name, email, lat, lon);
    let val = JSON.stringify({
      polygon_id: id_now,
    });
    // console.log("I set the polygon_id", polygon_id);
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      setFarmers(d.data);
    } catch (err) {
      console.log(err);
    }
    setYou(1);

    s1 = `${process.env.REACT_APP_BACKEND}/user/options`;
    requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    val = JSON.stringify({
      name: name,
      email: email,
    });
    // console.log("Options called");
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      setOptions(d.data.options);
      console.log("Hellooo", d.data);
    } catch (err) {
      console.log(err);
    }

    s1 = `${process.env.REACT_APP_BACKEND}/user/latitudes`;
    requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    val = JSON.stringify({
      polygon_id: id_now,
    });
    let lat_now, lon_now;
    const location = localStorage.getItem("latitudes");
    if (location) {
      const foundLocation = JSON.parse(location);
      lat_now = foundLocation.lat;
      setLat(foundLocation.lat);
      lon_now = foundLocation.lon;
      setLon(foundLocation.lon);
    }
    let lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4;
    let a = Math.sqrt((1500 * 4) / Math.sqrt(3));
    let b = (Math.sqrt(3) / 2) * a;
    b /= 1000;
    lat1 = lat_now - b * Math.cos(45);
    lon1 = lon_now - b * Math.sin(45);

    lat2 = lat_now + b * Math.cos(45);
    lon2 = lon_now - b * Math.sin(45);

    lat3 = lat_now + b * Math.cos(45);
    lon3 = lon_now + b * Math.sin(45);

    lat4 = lat_now - b * Math.cos(45);
    lon4 = lon_now + b * Math.sin(45);

    setLat1(lat1);
    setLat2(lat2);
    setLat3(lat3);
    setLat4(lat4);
    setLon1(lon1);
    setLon2(lon2);
    setLon3(lon3);
    setLon4(lon4);
    setLoading(false);
  };
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    document.head.appendChild(link);
    const loggedInUser = localStorage.getItem("user");
    let name2;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setName(foundUser.name);
      name2 = foundUser.name;
      setEmail(foundUser.email);
    }
    let lat_now, lon_now;
    lat_now = lat;
    lon_now = lon;
    const location = localStorage.getItem("latitudes");
    if (location) {
      const foundLocation = JSON.parse(location);
      lat_now = foundLocation.lat;
      setLat(foundLocation.lat);
      lon_now = foundLocation.lon;
      setLon(foundLocation.lon);
    }
    const p = localStorage.getItem("polygon");
    if (p) {
      const p2 = JSON.parse(p);
      // console.log(p2.polygon_id);
      if (typeof p2 != "NULL") setId(p2.polygon_id);
    }

    const p2 = localStorage.getItem("friends");
    console.log("friends", p2);
    if (p2) {
      const p3 = JSON.parse(p2);
      setFriends(p3.friends);
      // console.log("friends", p3.friends[2]);
    }

    if (localStorage.getItem("polygon")) {
      fetchFarmers();
    } else {
      setLoading(0);
    }
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
        rel="stylesheet"
      ></link>

      <Navbar profile={profile} setProfile={setProfile} show={1} />
      {options ? (
        <h3> Click on the crop to find who is growing the crop in your area</h3>
      ) : (
        <h3>
          {" "}
          Gain insight on what crops farmers in your area are growing by filling
          the form in your profile
        </h3>
      )}
      <h1 style={{ marginBottom: "50px", marginTop: "50px", color: "black" }}>
        Select the crops you want to explore in your area
      </h1>
      <button
        style={{ margin: "5px", padding: "5px", borderRadius: "5px" }}
        onClick={() => fetchFarmers()}
      >
        {" "}
        Farmers{" "}
      </button>
      {name ? (
        options ? (
          data.map((curr_val, curr_idx, arr) => {
            return (
              <button
                style={{
                  borderStyle: "none",
                  margin: "5px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                key={curr_val.name}
                onClick={() => clickHandler(curr_val.name)}
              >
                {" "}
                {curr_val.name}
              </button>
            );
          })
        ) : (
          ""
        )
      ) : (
        <p> Signup to access </p>
      )}
      <MapContainer
        style={{ margin: "100px" }}
        center={[lat, lon]}
        zoom={13}

      >
        {console.log(lat, lon)}
        {you ? (
          <Marker position={[lat, lon]}>
            <Popup>
              {
                <p
                  onClick={() => {
                    Navigate(`/profile`);
                  }}
                >
                  {name} {email}
                </p>
              }

            </Popup>
          </Marker>
        ) : (
          ""
        )}
        // {console.log("debug", farmers)}

        {typeof farmers === "object"
          ? farmers.map((curr_val, curr_idx, arr) => {
            // console.log("debug", curr_val);
            // if (curr_val === null) return;

            curr_val.Lat = Number(curr_val.Lat);
            curr_val.Lon = Number(curr_val.Lon);
            // console.log("debug", (curr_val.Lat), (curr_val.Lon));
            let f1 = parseFloat(curr_val.Lat);
            let f2 = parseFloat(curr_val.Lon);
            // console.log("debug", typeof (f1), typeof (f2));

            return (
              <Marker
                key={curr_val.Email}
                position={[f1, f2
                ]}
              >
                <Popup>
                  Hello World
                </Popup>
                {console.log("debug", curr_val)}
                {friends[parseInt(curr_val.Email)] ? (
                  <Popup>
                    {console.log("debug", email, curr_val.Email)}
                    {curr_val.Email !== email ? <p
                      onClick={() => {
                        Navigate(`/profile/${curr_val.Name}`);
                      }}
                    >
                      {curr_val.Name} {curr_val.Email} {curr_val.Phone}
                    </p> : ""}
                  </Popup>
                ) : (
                  <Popup>
                    {curr_val.Email !== email ? <p
                      onClick={() => {
                        Navigate(`/profile/${curr_val.Name}`);
                      }}
                    >
                      {curr_val.Name} {curr_val.Email}
                    </p> : <p
                      onClick={() => {
                        Navigate(`/profile`);
                      }}
                    >
                      {curr_val.Name} {curr_val.Email}
                    </p>}
                  </Popup>
                )}
              </Marker>
            );
          })
          : ""}
        <Polygon
          positions={[
            [lat1, lon1],
            [lat2, lon2],
            [lat3, lon3],
            [lat4, lon4],
          ]}
        />
        {console.log(
          "All the latitudes",
          lat1,
          lon1,
          lat2,
          lon2,
          lat3,
          lon3,
          lat4,
          lon4
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      <Footer />
    </div >
  );
};

export default Home;
// Improvement could be setting localstorage because on loading we won't get the component or use a useEffect api call for geoLocation
// Also add filter for the user
// Returning different maps for different crops
// Making a button for differnet crops and farmers. Crops can be done by using forEach function or a map. Whenever I click on them
// i need to fetch an api from backend to return all the farmers on the model3 having the crops. You could use a state variable
// it's basic work would be having states from data.length. state 0 is default and will correspond to farmers fetching. All the
// other buttons are disabled and would be a link to the profile to complete the profile to access the features
