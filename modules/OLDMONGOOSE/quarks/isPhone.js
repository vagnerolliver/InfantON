'use strict';

msodule.exports = (value) => {
  const isEmpty = require('../isEmpty/isEmpty')(value);
 // const isString = require('../isEmpty/isString')(value);

  if(isEmpty) return false;
 // if(!isString) return false;

  return true;
}