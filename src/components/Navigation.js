import sword from '../Assets/sword.png'
import { Link } from 'react-router-dom';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'

// const Left = () => {
//   return (
//     <div>
//     </div>
//   )
// }

const Navigation = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><img src={sword} style={{ width: '150%', height: '150%' }} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem value="1" containerElement={<Link to="/dashboard" />} primaryText="Your Dashboard" />
    <MenuItem value="2" containerElement={<Link to={`/profile/users/${!props.user ? null : props.user.id}`} />} primaryText="Your Profile" />
    <MenuItem value="3" containerElement={<Link to="/topKingdoms" />} primaryText="Top Kingdoms" />
    <MenuItem value="4" containerElement={<Link to="/About" />} primaryText="About" />
    <MenuItem value="5" primaryText="Sign out" />
  </IconMenu>
);

// const Navigation = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <AppBar
//         title="Kingdom"
//         titleStyle={{ fontFamily: 'cursive'}}
//         iconElementLeft={<Left />}
//         iconElementRight={<Menu props={props}/>}
//       />
//     </div>
//   );
// }

const mapProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}
// ({ user })

export default connect(mapProps)(Navigation)
