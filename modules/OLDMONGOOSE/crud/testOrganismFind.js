// 'use strict';

// require('./../config/db');
// const Organism = require('./../organisms/user');
// const callback = require('./../organisms/organelles/callback');
// const query = { _id: '571f8a78e7e1e88440db0cd2' };

// Organism.find(query, callback);

'use strict';

require('./../config/db');
const Organism = require('./../organisms/curso');
const callback = require('./../organisms/organelles/callback');
const query = { _id: '571e3ba40887c04831afc752' };

Organism.find(query, callback);