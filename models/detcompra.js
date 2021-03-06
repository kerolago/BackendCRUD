const mongoose = require('mongoose');

const modelo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    cantidad: {
        type: String,
        require: true
    },
    total: {
        type: String,
        require: true
    },
    id_compra: {
        type: String,
        require: true
    },
    id_producto: {
        type: String,
        require: true
    },
    nombrepro: {
        type: String,
    },
    precio: {
        type: String,
    },
    nombre1: {
        type: String,
    }
});
module.exports = mongoose.model('detcompra', modelo);