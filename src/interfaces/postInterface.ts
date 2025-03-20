interface IPost{
    title:String,
    content:String,
    likeCount:Number,
    userId:Number,
    tags?:[],
    images?:[],
    likes?:[],
    comments?:[]
}

export default IPost