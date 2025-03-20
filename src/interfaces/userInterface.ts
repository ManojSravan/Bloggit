export interface IUserRegistration{
    name:string,
    email:string,
    password:string,
    isAdmin?:Boolean,
    posts?:[],
    likes?:[],
    comments?:[],
    replies?:[]
}

export interface IUserLogin{
    email:string,
    password:string
}

 