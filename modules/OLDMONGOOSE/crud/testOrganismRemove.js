// 'use strict';

// require('./../config/db');
// const Organism = require('./../organisms/user');
// const query = { _id: '571f8d881b8ff3f42fc3c8c8' };
// const callback = require('./../organisms/organelles/callbackRemove');
 

// Organism.remove(query,callback);

'use strict';

require('./../config/db');
const Organism = require('./../organisms/curso');
const query = { _id: '571e3c4a75bc4d7c26f410ca' };
const callback = require('./../organisms/organelles/callbackRemove');
 
Organism.remove(query, callback);