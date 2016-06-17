'use strict';

require('./../config/db');
const Organism = require('./../organisms/user');
const callback = require('./../organisms/organelles/callback');
const query = { _id: '571f8a78e7e1e88440db0cd2' };

Organism.findOne(query, callback);