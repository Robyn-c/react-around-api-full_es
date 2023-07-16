const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          const urlRegex = /^(http|https):\/\/(www\.)?[\w.~:/?%#[\]@!$&'()*+,;=-]+[#]?$/;
          return urlRegex.test(value);
        },
        message: (props) => `${props.value} no es una URL válida`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardsSchema);
