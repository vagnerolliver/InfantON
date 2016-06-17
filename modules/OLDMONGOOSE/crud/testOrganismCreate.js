// 'use strict';
// require('./../config/db');
// const Organism = require('./../organisms/user');
// const callback = require('./../organisms/organelles/callback');
// const obj = {
//   email: 'fulano007@yahoo.com.br'
// , password: 'monge26'
// }

// Organism.create(obj, callback);

'use strict';
require('./../config/db');
const Organism = require('./../organisms/curso');
const callback = require('./../organisms/organelles/callback');
const obj = {
  name:'Learn Mean Chip'
, dateBegin: new Date('2016/06/20')
, link:'https://github.com/Webschool-io/workshop-js-funcional-free'
}

Organism.create(obj, callback);