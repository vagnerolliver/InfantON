'use strict';

module.exports = (value) => {
  const isEmpty = require('../isEmpty/isEmpty')(value);
  const isDate = require('../isEmpty/isDate')(value);

  if(isEmpty) return false;
  if(!isDate) return false;
  // Data precisa ser maior que a data atual
  const today = new Date();
  return value.setHours(0,0,0,0) > today.setHours(0,0,0,0);
}