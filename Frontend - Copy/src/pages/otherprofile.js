import React, { Component, useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

// Implementing a new feature where if userData is not there if someone tries to navigate on someone else's profile show it
function Profile() {

  const { name2 } = useParams();
  const [loading, setLoading] = useState(1);
  const [lc_data, setData] = useState({});
  const { name, email, setName, setEmail } = useGlobalContext();
  const [profile, setProfile] = useState(1);
  const [friends, setFriends] = useState([]);
  const fetchData = async () => {
    let name, email, accesstoken, id_now;
    const loggedInUser = localStorage.getItem("user");
    const polygonUser = localStorage.getItem("polygon");
    const obj = localStorage.getItem("obj");
    const pending = localStorage.getItem("pending");
    const notif = localStorage.getItem("notif");
    const friends = localStorage.getItem("friends");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      name = foundUser.name;
      email = foundUser.email;
      setName(foundUser.name);
      setEmail(foundUser.email);
    }
    else {
      setLoading(0);
      return;
    }
    if (polygonUser) {
      const foundUser = JSON.parse(polygonUser);
      id_now = foundUser.polygon_id;
    }
    if (obj && pending && notif && friends) {
      // setObj(JSON.parse(obj));
      setFriends(JSON.parse(friends));


    }

    // console.log(glob_name);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      };
      // console.log(name2);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/user/profile/${name2}`,
        config
      );

      // setLoading(false);
      console.log(name2);
      console.log(data);
      console.log("above")
      setData(data);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
    if (obj && pending && notif && friends) {
      // setObj(JSON.parse(obj));
      setFriends(JSON.parse(friends));
      setLoading(false);
      return;
    }
    let acceptLink = `${process.env.REACT_APP_BACKEND}/user/acceptList`;
    // console.log(polygon_id);
    let requestOptions = {
      method: "post",
      url: acceptLink,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    // console.log(myEmail);
    let val = JSON.stringify({
      email1: email,
    });
    try {
      const d = await axios.post(acceptLink, val, requestOptions);
      console.log("Friends", d);
      const arr = d.data;
      const arr2 = arr.map((curr_val, curr_idx, arr) => {
        return curr_val.Email;
      });
      // console.log("This is friends", arr);

      console.log(arr2);
      // setFriends(arr2);
      const notif2 = {};
      arr2.forEach((curr_val) => (notif2[curr_val] = 1));
      setFriends(notif2);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(1);
    setName("");
    setEmail("");
    console.log("h")
    fetchData();
    // setLoading(0);
  }, []);

  if (loading) {
    return <Loading />;
  } else if (name) {
    return (
      <div>
        <Navbar profile={profile} setProfile={setProfile} show={1} />
        <p className="others">
          <p>
            {" "}
            <span className="">Name :</span> {lc_data.name}{" "}
          </p>
          <p>
            {" "}
            <span className="">Email :</span>
            {lc_data.email}{" "}
          </p>
          {console.log(friends)}
          {friends[lc_data.email] ? (
            <p>
              {" "}
              <span className="">Phone:</span> {lc_data.phone}{" "}
            </p>
          ) : (
            ""
          )}
        </p>
      </div>
    );
  }
  else {
    return (
      <div>
        <Navbar profile={profile} setProfile={setProfile} show={1} />
        <h1> You forgot to sign in </h1>
      </div>
    )
  }
}

export default Profile;

// Onclick come here and just pass the parameter
