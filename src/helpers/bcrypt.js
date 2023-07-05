import bcrypt from "bcrypt";


export const hashPassword = async(password) => {
  const passwordHashed = await bcrypt.hash(password, 10);
  return passwordHashed;
};

export const comparePassword = async(password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
