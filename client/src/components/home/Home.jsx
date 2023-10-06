
import { Grid } from '@mui/material';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data' ;

//components

import Categories from './Categories';
import Posts from './post/Posts';

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Home = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
           
            <Grid container>
            
                <Grid container item xs={12} sm={10} lg={12}>
                    <Posts />
                </Grid>
                {/* <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton> */}
            {/* </Link> */}
            </Grid>
        </>
    )
}

export default Home;