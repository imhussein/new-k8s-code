import mongoose from "mongoose";

type UserAttrs = {
  email: string;
  password: string;
  avatar: string;
};

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  avatar: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  buildUser(attrs: UserAttrs): UserDocument;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.statics.buildUser = (userAttrs: UserAttrs) => {
  return new User(userAttrs);
};

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export { User };
