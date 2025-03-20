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

export interface IUserProfile{
    username:string,
    bio:string,
    avatar:string,
    coverImage:string,
    location:string,
    socialLinks?:[],
    tags?:[]
}