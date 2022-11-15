import mongoose from 'mongoose';

//================================>crate schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    cell: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      trim: true,
    },
    gallery: {
      type: Array,
      trim: true,
    },
  },
  { timestamps: true }
);

export const useModel = mongoose.model('registration', userSchema);
