'use strict';

module.exports = (value) => {
  const regex = /(https?:\/\/(?:www\.|(?!www))?[^\s\.]+\.[^\s]{2,}|\.[^\s]{2,})/i;
  const isEmpty = require('../isEmpty/isEmpty')(value);
  const isString = require('../isEmpty/isString')(value);

  if(isEmpty) return false;
  if(!isString) return false;

  return regex.test(value);
}