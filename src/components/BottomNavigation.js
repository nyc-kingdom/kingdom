import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import AutoComplete from 'material-ui/AutoComplete';
import crest from '../Assets/crest.png'

const favoritesIcon = <FontIcon className="material-icons">Connor</FontIcon>;
const nearbyIcon = <IconLocationOn />;


/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNav extends Component {
  state = {
    selectedIndex: 0,
    dataSource: []
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  handleRequest = () => {
    console.log('hellooooo')
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <AutoComplete
        hintText="Type anything"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleRequest}
        />
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
          label="Bushwick"
          icon={<img src={crest} width='30px' height='30px'/>}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Discover"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
          <BottomNavigationItem
            icon={favoritesIcon}
            onClick={() => this.select(1)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;
