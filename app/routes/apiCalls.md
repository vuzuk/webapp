## local login
POST - body = {email_username, password, isBlogger}
localhost:3000/api/auth/local/login
## local signUp
POST - body = {email, username, password, first_name, last_name, dob, gender, contact(opt), isBlogger}
localhost:3000/api/auth/local/signUp

## verification of email 
GET - query = {isBlogger, emailVerifKey, email}
localhost:3000/api/auth/verification/verifyEmail
## resending the email
GET - query = {isBlogger, email}
localhost:3000/api/auth/verification/resendEmail
## verification of otp
POST - body = {isBlogger, otp, contact}
localhost:3000/api/auth/verification/verifyOTP
## sending/resending of otp
GET - query = {isBlogger, contact}
localhost:3000/api/auth/verification/resendOTP

## get trending blogs of a month (could be via category, blogger)
GET - query = {categoryId, bloggerId, limit, offset} 
localhost:3000/api/unsecure/getTrendingBlogs
## get latest blogs of a month (could be via category, blogger)
GET - query = {categoryId, bloggerId, limit, offset} 
localhost:3000/api/unsecure/getLatestBlogs
## get blog
GET - query = {blogId} 
localhost:3000/api/unsecure/getBlog
## get blogger details
GET - query = {bloggerId} 
localhost:3000/api/unsecure/getBlogger

## check username
GET - query = {username, isBlogger} 
localhost:3000/api/unsecure/checkUsername
## check email
GET - query = {email, isBlogger} 
localhost:3000/api/unsecure/checkEmail
## check contact (for blogger only)
GET - query = {contact} 
localhost:3000/api/unsecure/checkContact


## Add Blog      
POST - body = {title, blog, categoryId, tags(stringified array)}
localhost:3000/api/secure/blogger/newBlog
## update Blog      
POST - body = {blogId, title, blog, category_id, tags(stringified array)}
localhost:3000/api/secure/blogger/updateBlog
## temporary delete a blog   
GET - query = {blogId}
localhost:3000/api/secure/blogger/tempDeleteBlog
## undo delete a blog   
GET - query = {blogId}
localhost:3000/api/secure/blogger/undoDeleteBlog


## update likings      
GET - query = {likings(stringified array)}
localhost:3000/api/secure/user/updateLikings


## toggle for follow blogger      
GET - query = {bloggerId}
localhost:3000/api/secure/generic/toggleFollowBlogger
## get following count
GET - query = {}
api/secure/generic/following
## get notifications
GET - query = {}
api/secure/generic/getNotifications


## view a blog      
GET - query = {blogId}
localhost:3000/api/secure/generic/viewBlog
## like a blog      
GET - query = {blogId}
localhost:3000/api/secure/generic/toggleBlogLike
## comment on a blog    
POST - body = {comment, blogId, parentId}
localhost:3000/api/secure/generic/addComment
## update comment on a blog    
POST - body = {commentId, comment}
localhost:3000/api/secure/generic/updateComment
## delete comment on a blog    
GET - query = {commentId}
localhost:3000/api/secure/generic/deleteComment
## like comment on a blog    
GET - query = {commentId}
localhost:3000/api/secure/generic/toggleCommentLike


## get profile
GET - query = {}
localhost:3000/api/secure/generic/getProfile
## update profile
POST - body = {first_name, last_name, gender, twitter, instagram, facebook, dob, contact}
api/secure/generic/updateProfile
## upload profile picture
POST - {key: avatar}
api/secure/generic/upload/profilePic
## upload cover pic
POST - {key: avatar}
api/secure/generic/upload/coverPic


## get blogs by category
GET - params = {categoryId}
/api/unsecure/getBlogsByCategory/:categoryId/:offset/:limit
## get blog
GET - query = {blogId}
api/unsecure/getBlog/:bloggerName/:slug
## get blogger details 
GET - query = {bloggerId}
api/unsecure/getBlogger
## get blogs of blogger     
GET - query = {bloggerId}
api/unsecure/getBlogsOfBlogger

## logout
GET - query = {}
api/secure/generic/logout


## STATS APIs
## get top blogs by views/likes   
GET - params = {para (views/likes)}
api/secure/blogger/top/:para
## get last 5 days views   
GET - query = {}
api/secure/blogger/lastFiveDaysViews


## Remaining tasks
update user profile
update blogger profile
upload user image
upload blogger image
getting blogs based on likings
password reset

