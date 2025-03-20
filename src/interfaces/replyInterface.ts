interface IReply{
    content:String,
    commentId:String,
    likeId?:String,
    repliedBy:String,
    attachments?:String
}

export default IReply