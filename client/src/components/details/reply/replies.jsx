
import { useContext ,useState,useEffect} from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Name = styled(Typography)`
    font-weight: 800,
    font-size: large;
    margin:10px;
    margin-right: 20px;
    border-bottom:2px solid white;
`;
const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;
const Div = styled("div")`
     display:flex;
     justify-content:space-between;
     margin:20px;
    
     background: linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%);
     color:#fff;
     -moz-box-shadow: 0 0 5px #888;
     -webkit-box-shadow: 0 0 5px#888;
      box-shadow: 0 0 5px #888;
      border-radius:10px
`

const Reply = styled(Typography)`
    margin-left:15px;
`

const Replies = ({ reply,post ,setToggle}) => {
    const { account } = useContext(DataContext)
    const removeReply = async () => {
        await API.deleteReplies(reply._id);
        setToggle(prev => !prev);
     }
    return (
        <Box>
        <Div>
            <div>
            <Name >{reply.name}</Name>
             <Reply>{reply.reply}</Reply>
            </div>
            <div>
            { (reply.username === account.username || post.username === account.username) && <DeleteIcon onClick={() => removeReply()} /> }
            </div>
            
        </Div>
       

</Box>
    )
}

export default Replies;

