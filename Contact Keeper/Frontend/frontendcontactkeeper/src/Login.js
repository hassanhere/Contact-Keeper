import React, { useState, useEffect } from "react";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [name, setname] = useState("mariadb");
  const [phone, setphone] = useState("");
  const [type,settype]=useState("personal")
  const [token,settoken]=useState()

  async function handlechange(e) {
    e.preventDefault();

    alert(name)
    alert(email)
    alert(password)

    await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        settoken(data.token)
        console.log("received token:",data.token)
      });
  }



  async function InsertData(e)
  {
    e.preventDefault()

    console.log(token)

    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(type)

    await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "x-auth-token": token,
          'Content-Type':'application/json'
        },
        body: JSON.stringify({name:name,email:email,phone:phone,type:type})
      })
        .then(res=>console.log(res.json()))
  

  }


  return (
    <div>
      <form onSubmit={handlechange}>
        <input
          type="text"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <hr />

      <form onSubmit={InsertData}>
        <input
          type="text"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="number"
          onChange={(e) => {
            setphone(e.target.value);
          }}
        />
        <button type="submit">Insert</button>
      </form>
    </div>
  );
}

export default Login;
