import bcrypt from 'bcryptjs'
const user = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'Normal User',
        email: 'normal@gmail.com',
        password: bcrypt.hashSync('12345', 10)
    },
    {
        name: 'Mail User',
        email: 'mail@gmail.com',
        password: bcrypt.hashSync('12345', 10)
    }
]

export default user
