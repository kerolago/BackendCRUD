const mongoose = require('mongoose');
const model = require('../models/detcompra');


//GET
exports.get = (req, res) => {
    model.find(req.params.id)
        .sort({ cantidad: 1, total: 1, id_compra: 1, id_producto: 1, nombrepro: 1, precio: 1, total: 1 })
        .select('_id cantidad total id_compra id_producto nombrepro precio total')
        .exec()
        .then(result => {
            console.log(result);

            if (result) {
                res.status(200).json({
                    modelo: result,
                    filas: result.length,
                    error_estado: false,
                    error: '',
                    mensaje: 'ok'
                });
            } else {
                res.status(404).json({
                    model: null,
                    filas: 0,
                    error_estado: false,
                    error: '',
                    mensaje: '!NO EXISTE DATOS!'
                });
            }
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            });
        });
}


exports.getId = (req, res) => {
        model.findOne({
                _id: req.params.id
            })
            .sort({ cantidad: 1, total: 1, id_compra: 1, id_producto: 1, nombrepro: 1, precio: 1, total: 1 })
            .select('_id cantidad total id_compra id_producto nombrepro precio total')
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        modelo: result,
                        filas: 1,
                        error_estado: false,
                        error: '',
                        mensaje: '!OK¡'
                    });
                } else {
                    res.status(204).json({
                        modelo: null,
                        filas: 0,
                        error_estado: false,
                        error: '',
                        mensaje: '!NO EXISTE DATOS¡'
                    });
                }
            })
            .catch(ex => {
                console.log(ex);

                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
    }
    //POST
exports.post = (req, res) => {
        const Model = new model({
            _id: new mongoose.Types.ObjectId,
            cantidad: req.body.cantidad,
            total: req.body.total,
            nombrepro: req.body.nombrepro,
            id_producto: req.body.id_producto,
            precio: req.body.precio,
            nombre1: req.body.nombre1

        });

        console.log('----- model', Model);

        Model.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    modelo: {
                        _id: Model._id,
                        cantidad: Model.cantidad,
                        total: Model.total,
                        nombrepro: Model.nombrepro,
                        id_producto: Model.id_producto,
                        precio: Model.precio,
                        nombre1: Model.nombre1
                    },
                    filas: 1,
                    error_estado: false,
                    error: '',
                    mensaje: '!REGISTRO ADICIONADO¡'

                });
            })
            .catch(ex => {
                res.status(500).json({
                    modelo: null,
                    filas: 0,
                    error_estado: true,
                    error: ex,
                    mensaje: '!ERROR¡'
                });
            });
        console.log('SALIDA DEL POST');

    }
    //PATCH
exports.patch = (req, res) => {
    model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .exec()
        .then(result => {
            console.log(result);

            res.status(200).json({
                modelo: result,
                filas: 1,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ACTUALIZADO¡'
            });
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: ex,
                mensaje: '!ERROR¡'
            })
        })
}

//DELETE
exports.delete = (req, res) => {
    model.remove({
            _id: req.params.id
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                modelo: null,
                filas: 0,
                error_estado: false,
                error: '',
                mensaje: '!REGISTRO ELIMINADO¡'
            });
        })
        .catch(ex => {
            console.log(ex);
            res.status(500).json({
                modelo: null,
                filas: 0,
                error_estado: true,
                error: '',
                mensaje: '!ERROR¡'
            });
        })
}