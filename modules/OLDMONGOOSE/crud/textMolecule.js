// const mongoose = require('mongoose');
// const MoleculeName = 'User';
// const Molecule = require('./../molecules/'+MoleculeName.toLowerCase());

// const Organism = mongoose.model(MoleculeName, Molecule);

// const DNA = {
//   email: 'vagner@vnda.com.br'
// , password: 'vagner123'
// };
// const Cell = new Organism(DNA);
// console.log('Cell', Cell);

// const mongoose = require('mongoose');
// const MoleculeName = 'Aluno';
// const Molecule = require('./../molecules/'+MoleculeName.toLowerCase());

// const Organism = mongoose.model(MoleculeName, Molecule);

// const DNA = {
//   name: 'Vagner'
// , dateBirth: new Date('1984/11/20')
// , cursos: [
//     {
//       name: 'Be MEAN'
//     , dateBegin: new Date('2016/06/20')
//     , link: 'https://github.com/Webschool-io/be-mean-instagram'
//     }
//   ]
// };
// const Cell = new Organism(DNA);
// console.log('Cell', Cell);

// const mongoose = require('mongoose');
// const MoleculeName = 'Curso';
// const Molecule = require('./../molecules/'+MoleculeName.toLowerCase());

// const Organism = mongoose.model(MoleculeName, Molecule);

// const DNA = {
//   name: 'Suissa'
// , dateBegin: new Date('2016/06/20')
// , link: 'https://github.com/Webschool-io/be-mean-instagram'
// };
// const Cell = new Organism(DNA);
// console.log('Cell', Cell);

const mongoose = require('mongoose');
const MoleculeName = 'Professor';
const Molecule = require('./../molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  schoolName: 'Recanto do Jardim'
, name: 'Vagner Oliveira'
, cursos: [
    {
      name: 'Be MEAN'
    , dateBegin: new Date('2016/06/20')
    , link: 'https://github.com/Webschool-io/be-mean-instagram'
    }
  ]
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);


