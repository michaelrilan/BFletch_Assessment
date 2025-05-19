import { Navbar, Container, Dropdown, Image, Nav } from "react-bootstrap";
import icon from '../assets/img/icon.jpg'
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { UserDataGet } from "../models/Home";
import { useState,useEffect } from "react";
import { userDataGetApi } from "../services/HomeService";
const Header = () => {
  const [userDataGet, setuserDataGet] = useState<UserDataGet | null>();
    useEffect(() => {
      getUserData();
    }, []);
    const getUserData = () => {
          userDataGetApi()
          .then((res) => {
            if (res?.data) {
              setuserDataGet(res?.data);
            }
          })
          .catch((e) => {
            setuserDataGet(null);
          });
      };
  const { logOut } = useAuth();


  return (
    <Navbar className='bg-primary'>
      <Container className='d-flex justify-content-between align-items-center'>
        
        <h5 className='text-white m-0'>Twimmer</h5>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant='primary'
            id='dropdown-basic'
            className='border-0 p-0'
          >
            
            <Image
              src= {userDataGet?.profilePic || "https://storage.googleapis.com/bluefletch-learning-assignment.appspot.com/profilepics/bfdefault.png"}
              alt='Logo'
              roundedCircle
              width={40}
              height={40}
              style={{ objectFit: "cover", border:"1px solid white"}}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as="span">
              <Link to="/updateprofile" className="dropdown-item">Update Avatar</Link>
            </Dropdown.Item>
            <Dropdown.Item as="span">
              <a className="dropdown-item" onClick={logOut}>Logout</a>
            </Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Header;