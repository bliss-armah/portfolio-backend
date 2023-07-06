import bcrypt from 'bcrypt'

export const hashPassword = async (password:string) : Promise<string> =>{
    try {
        const saltRoounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRoounds)
        return hashedPassword
    } catch (error) {
        console.log('Error hashing password', error)
        throw error
    }
}