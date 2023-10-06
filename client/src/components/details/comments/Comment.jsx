import { useContext ,useState,useEffect} from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";
import Replies from "../reply/replies";

//import { Box, TextareaAutosize, Button, styled } from '@mui/material';

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
    background: linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%);
    color:#fff;
    -moz-box-shadow: 0 0 5px #888;
    -webkit-box-shadow: 0 0 5px#888;
     box-shadow: 0 0 5px #888;
     border-radius:10px
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const CommentBox = styled("div")`
background: linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%);
min-height:4vh
-moz-box-shadow: 0 0 5px #888;
-webkit-box-shadow: 0 0 5px#888;
 box-shadow: 0 0 5px #888;
 border-radius:10px;
 word-wrap:break-word;
 margin-bottom:10px;
`

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;


const Comment = ({ comment,post, setToggle }) => {

    const { account } = useContext(DataContext)
    const [showReplyInput, setShowReplyInput] = useState(true);
    const [replies,setReplies] = useState([])
    const [postDetails,setPostDetails] = useState()
  const [replyText, setReplyText] = useState("");
  const [postdata,setPostData] = useState(post)

  const handleReply = async () => {
    const data = {
        name:account.username,
        commentId:comment._id,
        date:toString(new Date()),
        reply:replyText
    }

    console.log(data)
   const response = await API.newReply(data);

   if(response.isSuccess){
    setReplies([...replies,data])
    // Clear the reply input and hide it
    setReplyText("");
    setShowReplyInput(true);
   }    
  };
    
  useEffect(() => {
    if(comment.postId){
    const fetchData = async () => {
        let response = await API.getPostById(comment.postId);
        if (response.isSuccess) {
            setPostDetails(response.data);
            console.log("this is post details",response.data)
        }
       
    }
    fetchData()
}
    console.log("this is post",post)
    const getData = async () => {
        const response = await API.getReplies(comment._id);
        if (response.isSuccess) {
            setReplies(response.data);
            console.log("this is repliess",replies)
        }
    }
    getData();
  
}, [comment]);


   
    
    const removeComment = async () => {
       await API.deleteComment(comment._id);
       setToggle(prev => !prev);
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { (comment.name === account.username || post.username === account.username) && <DeleteIcon onClick={() => removeComment()} /> }
            </Container>
            <CommentBox >
            <Typography>{comment.comments}</Typography>
                </CommentBox>
             {/* Display reply input when 'showReplyInput' is true */}         
      { (
        <div>
            
          <Box>
        {
            replies && replies.length > 0 && replies.map(reply => (
                // <Comment comment={comment} setToggle={setToggle} />
                // <div>
                //      <Name>{reply.name}</Name>
                //      <Typography>{reply.reply}</Typography>
                // </div>
                <Replies reply={reply} post={post} setToggle={setToggle}/>
               
            ))
        }
    </Box>

   { post.username === account.username && (<div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center", gap : "8px"}}>
          <textarea
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{width : "80vw", height : "6vh"}}
          />
          <button onClick={() => handleReply()}>Post Reply</button>
          </div>)}
        </div>
        
        
       
      )}
        </Component>
    )
}

export default Comment;