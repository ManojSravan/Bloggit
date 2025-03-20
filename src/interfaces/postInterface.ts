interface IPost{
    title:string,
    content:string,
    likeCount?:Number,
    userId:Number,
    tags?:[],
    images?:[],
    likes?:[],
    comments?:[]
}

export default IPost