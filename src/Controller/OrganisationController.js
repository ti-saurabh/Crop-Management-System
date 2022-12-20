//const crop = require("../Model/Crop")
const Organisation = require("../Model/Organisation")

const jwt = require("jsonwebtoken")





const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };

const isValidRequest = function (object) {
    return Object.keys(object).length > 0
}


const isValidPassword = function (password) {
    return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))
}



const createOrganisation = async function(req,res)
{
    let data = req.body

    if (!isValidRequest(data)) { return res.status(400).send({message: "Organisation data is required" }) }
    const { organisation, property, region, field, password } = data

    if (!isValid(organisation)) { return res.status(400).send({message: "organisation is required" }) }
    if (!isValid(property)) { return res.status(400).send({message: "property is required" }) }
    if (!isValid(region)) { return res.status(400).send({message: "region is required" }) }
    if (!isValid(field)) { return res.status(400).send({message: "field is required" }) }
    if (!isValid(password)) { return res.status(400).send({message: "password is required" }) }

    let obj = {
        organisation:organisation,
        property:property,
        region:region,
        field:field,
        password: password
    }

    let Organisationdata= await Organisation.create(obj)
 
    return res.send({message:"Organisation Created", data : Organisationdata})

};

const loginOrg = async function (req, res) {
        const data = req.body
       
        if (!isValidRequest(data)) { return res.status(400).send({message: "data is required" }); }

        const organisation = data.organisation
        const password = data.password


        if (!isValid(organisation)) { return res.status(400).send({message: "Email is required" }) }

        if (!isValid(password)) { return res.status(400).send({message: "Password is required" }) }
        if (!isValidPassword(password)) { return res.status(400).send({message: "Password should be in right format" }) }

        const userdata = await Organisation.findOne({ organisation : organisation, password: password });
        if (!userdata) { return res.status(404).send({message: "No user found " }) }

        
        let token = jwt.sign({
            userId: userdata._id.toString()
        },
            "project"
        )

        res.header("x-api-key", token);
        return res.status(200).send({message: "Login Successfully", data: token })
 
};


module.exports = { loginOrg, createOrganisation} 