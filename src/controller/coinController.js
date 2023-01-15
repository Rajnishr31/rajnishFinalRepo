const axios = require("axios");
const coinModel = require("../models/coinsModel");

const getCoins = async function (req, res) {
    try {
        let data = await axios.get("https://api.coincap.io/v2/assets");
        let coinData = data.data;
        let checkCoinData = await coinModel.find();

        if (checkCoinData.length == 0) {
            let newArr = [];
            for (let i = 0; i < coinData.data.length; i++) {
                let newObj = {
                    symbol: coinData.data[i].symbol,
                    name: coinData.data[i].name,
                    marketCapUsd: coinData.data[i].marketCapUsd,
                    priceUsd: coinData.data[i].priceUsd
                }
                await coinModel.create(newObj);
                newArr.push(newObj);
            }
            return res.status(201).send({ status: true, message: "CoinCap has created." });

        } else {

            let getCoinsData = await coinModel.find().lean().select({ _id: 0, __v: 0 });
            for (let i = 0; i < getCoinsData.length; i++) {
                getCoinsData[i].changePercent24Hr = coinData.data[i].changePercent24Hr;
            }

            for (let i = 0; i < getCoinsData.length; i++) {
                getCoinsData.sort((a, b) => (b.changePercent24Hr) - (a.changePercent24Hr));
            }
            return res.status(200).send({ "data": getCoinsData });

        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports = { getCoins };