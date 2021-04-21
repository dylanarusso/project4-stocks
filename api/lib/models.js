const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../lib/db');


class Portfolio extends Model {

}

Portfolio.init ({
    symbol: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,

    },
    price: {
        type: DataTypes.STRING,
    },
}, {
    //Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Portfolio', // We need to choose the model name
});

class Wallet extends Model {

}

Wallet.init ({
    value: {
        type: DataTypes.STRING,
    }

}, {
    //Other model options go here
    sequelize, // We need to pass the connect instance
    modelName: 'Wallet', // We nned to choose the model name
});

const seedTheWallet = async () => {
    let wallet = await Wallet.findOne({});
    if(!wallet){
        await Wallet.create({value: 1000000});
    }
};
seedTheWallet();


sequelize.sync({alter: true});

module.exports = {
    Portfolio, Wallet
};