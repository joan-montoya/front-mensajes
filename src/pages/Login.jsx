import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../service/api";
import "./login.css";

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ username: "", password: "" });
    
    useEffect(() => {
      if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
    }, []);
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
  
    const handleSubmit = async (event) => {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
  
          navigate("/");
        }
    };

    return (
        <div className="cont">
          <form action="" onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                <h1>WhatsOpp</h1>
              </div>
              <input
                type="text"
                placeholder="Usuario"
                name="username"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Ingresar</button>
              <span>
                ¿ No tienes cuenta ? <Link to="/register">Crear una.</Link>
              </span>
            </form>
        </div>

      );
    }


  