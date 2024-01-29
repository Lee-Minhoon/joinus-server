import { cloneDeep } from "lodash";

export const signupParamsDoc = {
  password: { type: "string", example: "1234" },
  social_id: { type: "string", example: "1234" },
  name: { type: "string", example: "John Doe" },
  sex: { type: "boolean", example: true },
  phone: { type: "string", example: "01012341234" },
  email: { type: "string", example: "john@gmail.com" },
};

export const signinParmasDoc = {
  email: { type: "string", example: "john@gmail.com" },
  password: { type: "string", example: "joinus" },
};

export const singinResponseDoc = {
  token: { type: "string", example: "token" },
};

const userBase = {
  name: { type: "string", example: "John Doe" },
  sex: { type: "boolean", example: true },
  phone: { type: "string", example: "01012341234" },
  email: { type: "string", example: "john@gmail.com" },
};

const clubBase = {
  name: { type: "string", example: "name" },
  description: { type: "string", example: "description" },
  capacity: { type: "number", example: 1 },
};

export const userDoc = {
  ...cloneDeep(userBase),
  password: { type: "string", example: "1234" },
  social_id: { type: "string", example: "1234" },
};

export const userDtoDoc = cloneDeep(userBase);

export const userUpdateDoc = cloneDeep(userBase);

export const clubDoc = cloneDeep(clubBase);

export const clubDtoDoc: any = cloneDeep(clubBase);

export const clubCreateDoc = cloneDeep(clubBase);

export const clubUpdateDoc = cloneDeep(clubBase);

const feedBase = {
  title: { type: "string", example: "title" },
  content: { type: "string", example: "content" },
};

export const feedDoc = {
  ...cloneDeep(feedBase),
  user_id: { type: "number", example: 1 },
  club_id: { type: "number", example: 1 },
  user: { properties: cloneDeep(userDtoDoc) },
  club: { properties: cloneDeep(clubDtoDoc) },
};

export const feedDtoDoc = cloneDeep(feedBase);

export const feedCreateDoc = cloneDeep(feedBase);

export const feedUpdateDoc = cloneDeep(feedBase);
