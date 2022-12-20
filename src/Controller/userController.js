const user = require ("../Model/User");
const Crop = require ("../Model/Crop");
const jwt = require("jsonwebtoken");



const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };
  

  const isValidEmail = function (value) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(value)
}
const isValidRequest = function (object) {
    return Object.keys(object).length > 0
}


const isValidPassword = function (password) {
    return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))
}


const createUser = async function (req, res) {
 
        let data = req.body
        
        if (!isValidRequest(data)) { return res.status(400).send({message: "user data is required" }) }
        const { name, email, password } = data

        if (!isValid(name)) { return res.status(400).send({message: "Name is required" }) }

        if (!isValid(email)) { return res.status(400).send({message: "Email is required" }) }
        if (!isValidEmail(email)) { return res.status(400).send({message: "Please provide a valid email" }) }

        let isEmailUnique = await user.findOne({ email: email })
        if (isEmailUnique) { return res.status(400).send({message: "Email is already exist" }) }

        if (!isValid(password)) { return res.status(400).send({message: "Password is required" }) }
        if (!isValidPassword(password)) { return res.status(400).send({message: "Password should be in right format" }) }


        let obj = {
            name: name,
            email: email,
            password: password
        }
        const newUser = await user.create(obj);
        return res.status(201).send({message: 'New User created successfully', data: newUser })

};


const loginUser = async function (req, res) {
        const data = req.body
       
        if (!isValidRequest(data)) { return res.status(400).send({message: "data is required" }); }

        const email = data.email
        const password = data.password


        if (!isValid(email)) { return res.status(400).send({message: "Email is required" }) }
        if (!isValidEmail(email)) { return res.status(400).send({message: "enter a valid email address" }) }

        if (!isValid(password)) { return res.status(400).send({message: "Password is required" }) }
        if (!isValidPassword(password)) { return res.status(400).send({message: "Password should be in right format" }) }

        const userdata = await user.findOne({ email: email, password: password });
        if (!userdata) { return res.status(404).send({message: "No user found " })};

    
        return res.status(200).send({message: "Login Successfully", data : userdata})
 
};


const getCropForUser = async function (req, res) {

    let cropData = await Crop.find();
  
    return res.send({ data: cropData });
  };
  


module.exports = { createUser, loginUser, getCropForUser} 
