import bcrypt from 'bcryptjs';

const password = '123456';

const passwordHash = bcrypt.hashSync(password, 8);

export default passwordHash;
