'use strict';

module.exports = (value) => {
	const isEmpty = require('../isEmpty/isEmpty')(value);
 
  if(isEmpty) return false;

  return true;
}