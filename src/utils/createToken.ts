import { sign } from "jsonwebtoken";

export const CreateToken = (id) => {
    const token = sign({}, "desafioNode", {
        subject: id,
        expiresIn: "1d"
      });

      return {token}
}
