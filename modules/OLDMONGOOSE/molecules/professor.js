const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
	user_id: require('./../atoms/userRef')(Schema)
,  name: require('./../atoms/name')
, schoolName: require('./../atoms/schoolName')
cursos: [ require('./../atoms/cursoRef')(Schema) ]
}

module.exports = new Schema(Molecule);