"use strict";
const Joi = require("joi");
const { DEFAULT_LOCALE, ALLOWED_LOCALE } = require("../../../../utils/constants");

exports.createValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.boolean().optional().valid(true, false).default(true),
  image: Joi.any().optional().messages({
    "any.base": "Image should be a file",
  }),
  pdf: Joi.any().optional().messages({
    "any.base": "Image should be a file",
  }),
});

exports.updateValidator = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.any().optional().messages({
    "any.base": "Image should be a file",
  }),
  pdf: Joi.any().optional().messages({
    "any.base": "Image should be a file",
  }),
  status: Joi.boolean().valid(true, false).default(true).optional(),
});

exports.listValidator = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().optional(),
  search: Joi.string().optional().allow(""),
  filter: Joi.object().optional(),
  language: Joi.string()
    .valid(...ALLOWED_LOCALE)
    .default(DEFAULT_LOCALE)
    .optional(),
});

exports.reorderValidator = Joi.object({
  rows: Joi.string().required(),
});

exports.IdValidator = Joi.object({
  _id: Joi.string().hex().length(24).required(),
});

exports.userIdValidator = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

exports.statusValidator = Joi.object({
  status: Joi.boolean().required().valid(true, false).messages({
    "boolean.base": "Status should be either true or false",
    "any.only": "Status should be either true or false",
    "any.required": "Status is a required",
  }),
  _id: Joi.string().hex().length(24).required(),
});