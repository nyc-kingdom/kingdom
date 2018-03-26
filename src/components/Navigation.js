import { sword } from '../Assets'
import { Link } from 'react-router-dom';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'

const Navigation = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><img src={sword} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem value="1" containerElement={<Link to="/dashboard" />} primaryText="Your Dashboard" />
    <MenuItem value="2" containerElement={<Link to={`/profile/users/${!props.user ? null : props.user.id}`} />} primaryText="Your Profile" />
    <MenuItem value="3" containerElement={<Link to="/topKingdoms" />} primaryText="Top Kingdoms" />
    <MenuItem value="4" containerElement={<Link to="/About" />} primaryText="About" />
  </IconMenu>
);

const mapProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapProps)(Navigation)
