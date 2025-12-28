import { compare, hash } from "bcryptjs";

export async function hashPassowrd(password) {
    const hashPassowrd = await  hash(password, 12);
    return hashPassowrd;
}
export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword)
    return isValid;
}

