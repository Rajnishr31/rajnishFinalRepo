const collegeModel = require("../models/collegeModel");
const axios = require("axios");
// const validUrl = require('valid-url');


let nameRegex = /^[A-Za-z]{3,20}$/
// let fullNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
let fullNameRegex =  /^[a-zA-Z ,-]*$/
// const linkRegex =/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
// const linkRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

//[a-zA-Z]
//



const createCollege = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data;
        if (Object.keys(req.body).length != 0) {
            if (!name || name == "") {
                return res.status(400).send({ status: false, message: "name is required." });
            }

            if (!name.match(nameRegex)) {
                return res.status(400).send({ status: false, message: "Please, provide valid name." });
            }
           
            if (!fullName || fullName == "") {
                return res.status(400).send({ status: false, message: "FullName is required." });
            }

            if (!fullName.match(fullNameRegex)) {
                return res.status(400).send({ status: false, message: "Please , provide valid fullName" });
            }
            
            
            
            
            

            
            // if (!validUrl.isUri(logoLink)) {
            //     return res.status(400).send({ status: false, message: "require a valid logoLink" });
            // }
            // if (!logoLink.match(linkRegex)) {
            //     return res.status(400).send({ status: false, message: "provide valid LogoLink." });
            // }

            // let checkUrl = await axios.get(logoLink);
            // console.log(checkUrl);
            if (!logoLink || logoLink == "") {
                return res.status(400).send({ status: false, message: "LogoLink required." });
            }
            let urlfound = false;
            // let url = { method: 'get', url: logoLink };

            await axios.get(logoLink)
            .then((result) => {
            if (result.status == 201 || result.status == 200)
                urlfound = true;
            })
            .catch((err) => {});

            if (urlfound == false) return res.status(400).send({ status: false , msg: "Logo Link is not correct." })


            
            const collegeCreate = await collegeModel.create(req.body);
            const result = await collegeModel.findById(collegeCreate.id).select({ _id: 0, updatedAt: 0, createdAt: 0, _v: 0 });
            res.status(201).send({ status: true, message: result });
        } else {
            return res.status(400).send({ status: false, message: "Invalid request." });
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { createCollege };