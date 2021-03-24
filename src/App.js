import { useState } from "react";
import "./App.css";

const Login = () => {

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState({"email": "", "password": ""});
    const [isValid, setIsValid] = useState(false)

    const validate = () => {
        const input = form;
        const errors = {};

        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/

        errors["email"] = !input["email"] ? "" : emailPattern.test(input["email"]) ? false : "Invalid Email Address"
        errors["password"] = !input["password"] ? "" : passwordPattern.test(input["password"]) ? false : "Password must contain one uppercase, one lowercase, one alpha numeric, one special characters"
    
        setValidation(errors)
        return (errors["email"] === false && errors["password"] === false ) ? true : false
    }

    const handleChange = (e) => {
        let input = form;
        input[e.target.name] = e.target.value;
        setForm(input)
        setIsValid(validate());
        console.log({form});  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate() === true){
            setIsValid(false)
            // Submit Logic goes here
        }
        setForm({"email": "", "password": ""})
        setIsValid(false)
    }

    return (
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <h1>Login</h1>
            <div className={`input-container ${validation["email"] ? "invalid" : ""}`}>
                <input type="text" name="email" value={form["email"]} placeholder="Enter Email" onChange={(e) => handleChange(e)}/>
                {validation["email"] && <span>{validation["email"]}</span>}
            </div>
            <div className={`input-container ${validation["password"] ? "invalid" : ""}`}>
                <input type="password" name="password" value={form["password"]} placeholder="Enter Password" onChange={(e) => handleChange(e)}/>
                {validation["password"] && <span>{validation["password"]}</span>}
            </div>
            <button disabled={!isValid}>Login</button>
        </form>
    )
}

export default Login;
