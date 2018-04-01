import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group' 

class Ticker extends Component{
    constructor(props){
        super(props)
        this.state = { hidden: false }
    }

    render(){
        return (
            <div id="Ticker">
                <div
                    className='tickerTape'
                    onClick={()=>{this.setState({hidden: !this.state.hidden})}}
                >
                    See what's happening!
                </div>
                {
                    !this.state.hidden &&
                    <CSSTransitionGroup
                        transitionName='tickerTape'
                        transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}
                    >
                {
                    this.props.checkIns.length > 0 &&
                    this.props.checkIns
                        .slice(this.props.checkIns.length - 12, this.props.checkIns.length)
                        .reverse()
                        .map(check => 
                            <div className="tickerTape" key={check.id}>
                                {`${check.user.username} just checked into ${check.establishment.name}!`}
                            </div>
                        )
                }
                </CSSTransitionGroup>
                }
            </div>
        )
    }
}

const mapProps = state => {
    return {
      user: state.user,
      trackLocation: state.trackLocation,
      checkIns: state.checkins
    }
}

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Ticker)