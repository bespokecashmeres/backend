"use strict";
const mongoose = require("mongoose");
const { serverResponseMessage } = require("../../../../config/message");
const { httpResponses } = require("../../../../utils/http-responses");
const { httpStatusCodes } = require("../../../../utils/http-status-codes");
const Types = mongoose.Schema.Types;

const childCategorySchema = new mongoose.Schema({
  name: {
    type: Types.Object,
    required: true,
    default: {},
  },
  description: {
    type: Types.Object,
    default: {},
  },
  slug: {
    type: Types.String,
    required: true,
    unique: true,
  },
  image: {
    type: Types.String,
    required: true,
  },
  rowOrder: {
    type: Types.Number,
    default: 0,
  },
  status: {
    type: Types.Boolean,
    default: true,
  },
  genderId: {
    type: Types.ObjectId,
    ref: "genders",
    required: true,
  },
  mainCategoryId: {
    type: Types.ObjectId,
    ref: "maincategories",
    required: true,
  },
  subCategoryId: {
    type: Types.ObjectId,
    ref: "subcategories",
    required: true,
  },
});

childCategorySchema.pre("findOneAndUpdate", async function (next) {
  const SchemaModel = mongoose.model("childcategories", childCategorySchema);
  const filter = this.getFilter();
  const slug = this.get("slug");
  const result = await SchemaModel.findOne({
    $or: [{ slug }],
    _id: { $ne: filter._id },
  });
  if (result) {
    const errorField = serverResponseMessage.SLUG_EXISTS;
    const error = new Error(errorField);
    error.code = httpResponses.DUPLICATE_FIELD_VALUE_ERROR;
    error.status = httpStatusCodes.BAD_REQUEST;
    return next(error);
  }
  next();
});

childCategorySchema.pre("save", async function (next) {
  const SchemaModel = this.model("childcategories");
  try {
    const result = await SchemaModel.findOne({
      $or: [{ slug: this.slug }],
    });
    if (result) {
      const errorField = serverResponseMessage.SLUG_EXISTS;
      const error = new Error(errorField);
      error.code = httpResponses.DUPLICATE_FIELD_VALUE_ERROR;
      error.status = httpStatusCodes.BAD_REQUEST;
      return next(error);
    }
    next();
  } catch (err) {
    next(err);
  }
});

const ChildCategory = mongoose.model("childcategories", childCategorySchema);

module.exports = ChildCategory;