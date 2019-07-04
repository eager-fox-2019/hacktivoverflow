#Model
1.User
 -email
 -password

2.Posts
 -title
 -description
 -author: [userId]
 -createdAt
 -comments: [commentId]
 -upvotes: [userId]
 -downvotes: [userId]

3.Comments
 -title
 -description
 -author: [userId]
 -createdAt
 -upvotes: [userId]
 -downvotes: [userId]
 -post: [postId]
