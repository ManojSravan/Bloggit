import bcrypt from 'bcrypt'

export const hashPassword=async(password:string,salt:number)=>{
    const hashedPassword= bcrypt.hashSync(password,salt);
    return hashedPassword
}

export const comparePassword=async(hashedPassword:string,password:string)=>{
    const comparedPassword=await bcrypt.compareSync(password,hashedPassword)
    return comparedPassword
}

 