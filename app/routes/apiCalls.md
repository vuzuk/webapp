## local login
POST - body = {email_username, password, isBlogger}
/api/auth/local/login
## local signUp
POST - body = {email, username, password, first_name, last_name, dob, gender, contact(opt), isBlogger}
/api/auth/local/signUp

## verification of email 
GET - query = {isBlogger, emailVerifKey, email}
/api/auth/verification/verifyEmail
## resending the email
GET - query = {isBlogger, email}
/api/auth/verification/resendEmail
## verification of otp
POST - body = {isBlogger, otp, contact}
/api/auth/verification/verifyOTP
## sending/resending of otp
GET - query = {isBlogger, contact}
/api/auth/verification/resendOTP


## get trending blogs (could be via category, blogger)
GET - query = {categoryId, bloggerId}  -  params = {limit, offset} 
/api/unsecure/getTrendingBlogs/:offset/:limit
## get latest blogs (could be via category, blogger)
GET - query = {categoryId, bloggerId}  -  params = {offset, limit}
api/unsecure/getLatestBlogs/:offset/:limit
## get trending pics (could be via category, blogger)
GET - query = {categoryId, bloggerId}  -  params = {offset, limit}
api/unsecure/getTrendingPics/:offset/:limit


## get blog
GET - query = {blogId} 
/api/unsecure/getBlog
## get blogger details
GET - query = {bloggerId} 
/api/unsecure/getBlogger

## check username
GET - query = {username, isBlogger} 
/api/unsecure/checkUsername
## check email
GET - query = {email, isBlogger} 
/api/unsecure/checkEmail
## check contact (for blogger only)
GET - query = {contact} 
/api/unsecure/checkContact


## Add Blog      
POST - body = {title, blog, categoryId, tags(stringified array)}
/api/secure/blogger/newBlog
## update Blog      
POST - body = {blogId, title, blog, category_id, tags(stringified array)}
/api/secure/blogger/updateBlog
## temporary delete a blog   
GET - query = {blogId}
/api/secure/blogger/tempDeleteBlog
## undo delete a blog   
GET - query = {blogId}
/api/secure/blogger/undoDeleteBlog


## update likings      
GET - query = {likings (stringified array)}
/api/secure/user/updateLikings


## toggle for follow blogger      
GET - query = {bloggerId}
/api/secure/generic/toggleFollowBlogger
## get following count
GET - query = {}
api/secure/generic/following
## get notifications
GET - query = {}
api/secure/generic/getNotifications


## view a blog      
GET - query = {blogId}
/api/secure/generic/viewBlog
## like a blog      
GET - query = {blogId}
/api/secure/generic/toggleBlogLike
## comment on a blog    
POST - body = {comment, blogId, parentId}
/api/secure/generic/addComment
## update comment on a blog    
POST - body = {commentId, comment}
/api/secure/generic/updateComment
## delete comment on a blog    
GET - query = {commentId}
/api/secure/generic/deleteComment
## like comment on a blog    
GET - query = {commentId}
/api/secure/generic/toggleCommentLike
## get blog like status
GET - query = {blogId}
api/secure/generic/likeStatus



## get profile
GET - query = {}
/api/secure/generic/getProfile
## update profile
POST - body = {first_name, last_name, gender, twitter, instagram, facebook, dob, contact}
api/secure/generic/updateProfile
## upload profile picture
POST - {key: avatar}
api/secure/generic/upload/profilePic
## upload cover pic
POST - {key: avatar}
api/secure/generic/upload/coverPic


## search a blog
GET - query = {title}
api/unsecure/searchBlogs/:offset/:limit
## get blogs by tag
GET - req.param={tag}
api/unsecure/getBlogsByTag/:tag
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
## get blogs by ids (array)
GET - req.query={blogIds (array)}
api/unsecure/getBlogsByIds


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


## get liked    
GET - query = {}
api/secure/generic/getLiked
## get bookmarks    
GET - query = {}
api/secure/generic/getBookmarks

## get blog like status
GET - query = {blogId}
api/secure/generic/likeStatus
## get blog bookmark status
GET - query = {blogId}
api/secure/generic/bookmarkStatus



## Remaining tasks
update user profile
update blogger profile
upload user image
upload blogger image
getting blogs based on likings
password reset

