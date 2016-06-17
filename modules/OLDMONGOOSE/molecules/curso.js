const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  name: require('./../atoms/name')
, dateBegin: require('./../atoms/dateBegin')
, link: require('./../atoms/link')
}

module.exports = new Schema(Molecule);