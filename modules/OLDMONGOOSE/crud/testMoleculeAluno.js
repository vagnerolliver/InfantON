require('./../config/db');
const mongoose = require('mongoose');
const MoleculeName = 'Aluno';
const Molecule = require('./../molecules/'+MoleculeName.toLowerCase()+'Curso');

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
	user_id: '5739ec4efe970ae400096171'
, name: 'Usuario do SUissa'
, dateBirth: new Date('1984/11/20')
, cursos: ['571e3c4a75bc4d7c26f410ca']
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);

Cell.save((err, data) => {
  if(err) console.log('ERRO:', err);
  else console.log('RETORNO', data);
})