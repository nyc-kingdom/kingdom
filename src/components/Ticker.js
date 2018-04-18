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
                    onClick={() => this.setState({ hidden: !this.state.hidden })}
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
                            this.props.checkins.length > 0 &&
                            this.props.checkins
                                .slice(this.props.checkins.length - 12, this.props.checkins.length)
                                // only showing less than 30 mins
                                .filter(checkin => Date.parse(Date()) - Date.parse(checkin.createdAt) < 1800000)
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

const mapProps = ({ checkins }) => ({ checkins })

export default connect(mapProps)(Ticker)