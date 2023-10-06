
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';



const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: space-between;
    & > a {
        padding: 5px;
        color: #000;
        text-decoration: none;
    }
`

const StyledButton = styled(Button)`
    width: 200px;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const Header = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.setItem('accessToken',null);
        localStorage.setItem('refreshToken',null );
        navigate('/account')
    };
        
    return (
        <Component>
            <Container>
                <Link to='/'><MapsHomeWorkIcon/></Link>
                <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
                </Link>
              
                <div  onClick={() => logout()}><LogoutIcon/></div>
            </Container>
        </Component>
    )
}

export default Header;