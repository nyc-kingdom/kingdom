import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter() })





// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Provider store={store}><App/></Provider>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
