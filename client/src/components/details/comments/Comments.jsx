import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Icon } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';
import { Send } from '@mui/icons-material';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    
    width: 100%; 
    margin: 0 20px;
    min-height : 60px;
    padding : 10px 0px;
    &::placeholder {
        content: "";
        position: absolute;
        top: 30px;
        left: 10px;
       
      }
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        
        await API.newComment(comment);
        setComments([...comments,comment])
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container sx={{position : "relative"}}>
                {/* <Image src={url} alt="dp" />    */}
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                    
                />
                {/* <Button 
                sx={{position : "absolute",    
                right: "30px",
                top: "30px", }}
                startIcon={<Send />}
                    variant="outlined" 
                    // color="primary" 
                    size="small" 
                    // style={{ height: 30, width : 30 }}
                    onClick={(e) => addComment(e)}
                />        */}
                <Send sx={{position : "absolute",    
                right: "30px",
                top: "30px"}} color='primary' onClick={(e) => addComment(e)}/>      
               
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} post={post} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;