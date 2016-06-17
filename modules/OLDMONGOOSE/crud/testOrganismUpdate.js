// 'use strict';

// require('./../config/db');
// const Organism = require('./../organisms/user');
// const query = { _id: '571f8a78e7e1e88440db0cd2' };
// const mod = {password: 'MudeiAquiRapaiz'}
// const options = {};
// const callback = require('./../organisms/organelles/callback');
 

// Organism.update(query, mod, options, callback);


'use strict';

require('./../config/db');
const Organism = require('./../organisms/user');
const query = { _id: '5739ec4efe970ae400096171' };
const mod = {email: 'asdads',password:'$2a$08$aEFn5LqDOO.U2sZdOyoNeudWvbYPwUAgVoyfhP0DevQQibaBeQFLm'}
const options = {};
const callback = require('./../organisms/organelles/callback');
 

Organism.update(query, mod, options, callback);