import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { render } from 'react-dom';
import logo from '../../static/img/logo.png'
import IUser from "../../components/APIs/contracts/userclass"

export default class Layout extends React.Component{

  constructor(props) {
    super(props)
    this.contract= new IUser()
    this.state = {
       isMaker: false ,
       isPlayer: false
    }
  }

  async componentDidMount(){
   this.setState({isMaker:await this.contract.isMaker()})
   this.setState({isPlayer:await this.contract.isUser()})
  }

  render(){
    let maker 
    if(this.state.isPlayer){
    if(this.state.isMaker){
     maker=<div className='container'>
    <Navbar bg="pri" fixed="top" variant="light">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Button className='button'>
            <Link to="/" className='text-link'>Home</Link>
          </Button>
          <NavDropdown title="Printers" id="basic-nav-dropdown" className='button'>
            <NavDropdown.Item href="/AddPrinter" className='text-link'>Add Printers</NavDropdown.Item>
            <NavDropdown.Item href="/MyPrinters">My Printers</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Materials" id="basic-nav-dropdown"className='button'>
          <NavDropdown.Item href="/MyMaterial">My Material</NavDropdown.Item>
          <NavDropdown.Item href="/NewMaterial">New Material</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title=" Design" id="basic-nav-dropdown"className='button'>
            <NavDropdown.Item href="/MyDesign">My Design</NavDropdown.Item>
            <NavDropdown.Item href="/Announce">Announce new Design</NavDropdown.Item>
            <NavDropdown.Item href="/VoteDesign">Vote Design</NavDropdown.Item>
            <NavDropdown.Item href="/MyVotes">My Votes</NavDropdown.Item>
          </NavDropdown>
          <Button className='button'>
            <Link to="/MyOrder" className='text-link'>Order</Link>
          </Button>
        </div>
        </Navbar>
</div>
    }else{
      maker=<div className='container'>
    <Navbar bg="pri" fixed="top" variant="light">

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Button className='button'>
            <Link to="/">Home</Link>
          </Button>
          <NavDropdown title=" Design" id="basic-nav-dropdown">
            <NavDropdown.Item href="/MyDesign">MyDesign</NavDropdown.Item>
            <NavDropdown.Item href="/Announce">Announce new Design</NavDropdown.Item>
            <NavDropdown.Item href="/VoteDesign">Vote Design</NavDropdown.Item>
            <NavDropdown.Item href="/MyVotes">My Votes</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Orders" id="basic-nav-dropdown">
          <NavDropdown.Item href="/NewOrder">NewOrder</NavDropdown.Item>
          <NavDropdown.Item href="/MyOrder">MyOrder</NavDropdown.Item>
          </NavDropdown>
        </div>
        </Navbar>
</div>
    }
  }
  else{
    maker=<div className='container'>
    <Navbar bg="pri" fixed="top" variant="light">

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Button className='button'>
            <Link to="/">Home</Link>
          </Button>
          <Button className ="button">
          <Link to="/Signup">Signup</Link>
          </Button>
        </div>
        </Navbar>
</div>
  }
  return (
    <>
    {maker}
      <Outlet />
    </>
  )
};
}