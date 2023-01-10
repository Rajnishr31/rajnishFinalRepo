const collegeModel = require("../models/collegeModel");
const axios = require("axios");

//==========regex for college name and college full name==============
let nameRegex = /^[A-Za-z]{3,20}$/
let fullNameRegex = /^[a-zA-Z ,-]*$/



//================route handler for create college===================
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

            const uniqueName = await collegeModel.findOne({ name: name });
            if (uniqueName) {
                return res.status(400).send({ status: false, message: "Name is already exist . Give unique name." });
            }

            if (!fullName || fullName == "") {
                return res.status(400).send({ status: false, message: "FullName is required." });
            }

            if (!fullName.match(fullNameRegex)) {
                return res.status(400).send({ status: false, message: "Please , provide valid fullName" });
            }

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
                .catch((err) => { });

            if (urlfound == false) {
                return res.status(400).send({ status: false, msg: "Logo Link is not correct." });
            }

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

