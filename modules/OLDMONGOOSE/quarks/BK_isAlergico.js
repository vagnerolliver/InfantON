'use strict';

module.exports = (value) => {
  const isEmpty = require('../isEmpty/isEmpty')(value);
  const isString = require('../isEmpty/isString')(value);

  if(isEmpty) return true;
  if(!isString) return true;

  return true;
}