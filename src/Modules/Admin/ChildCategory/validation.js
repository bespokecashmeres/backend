"use strict";
const Joi = require("joi");
const { SLUG_REGEX } = require("../../../../utils/regex");

exports.createValidator = Joi.object({
  name: Joi.string().required(),
  mainCategoryId: Joi.string().hex().length(24).required(),
  subCategoryId: Joi.string().hex().length(24).required(),
  description: Joi.string().required(),
  slug: Joi.string().pattern(new RegExp(SLUG_REGEX)).required(),
  image: Joi.any().optional(),
  genderId:  Joi.string().hex().length(24).required(),
  status: Joi.boolean().optional().valid(true, false).default(true),
});

exports.updateValidator = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  mainCategoryId: Joi.string().hex().length(24).optional(),
  subCategoryId: Joi.string().hex().length(24).optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  slug: Joi.string().pattern(new RegExp(SLUG_REGEX)).optional(),
  image: Joi.any().optional(),
  genderId: Joi.string().hex().length(24).optional(),
  status: Joi.boolean().valid(true, false).optional(),
});

exports.dropdownValidator = Joi.object({
  genderId: Joi.string().hex().length(24).required(),
  mainCategoryId: Joi.string().hex().length(24).required(),
  subCategoryId: Joi.string().hex().length(24).required(),
})