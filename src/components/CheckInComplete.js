import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCheckIn } from '../store'

class Success extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return (
            this.props.verifyCheckIn.status==='FULFILLED'
                ?
                (
                    <div id='Spotlight'>
                        <br />
                        <h3>
                            CONGRATULATIONS YOU SUCCESSFULLY CHECKED IN, PLEASE PICK AN ITEM
                        </h3>
                        <button className='powerButton' onClick={this.handleClick}>
                            CONFIRM
                        </button>
                        <Link id='clean' to='/dashboard' className="escape">
                            X
                        </Link>
                    </div>
                )
                : this.props.verifyCheckIn.status==='FAILURE'
                    ?
                    (
                        <div id='Spotlight'>
                            <br />
                            <h3>
                                NICE TRY, SEEMS LIKE YOU'RE NOT NEAR THIS LOCATION
                            </h3>
                            <Link id='clean' to='/dashboard' className="escape">
                                X
                            </Link>
                        </div>
                    )
                    : <div id='Spotlight'></div>
        )
    }

    handleClick(evt) {
        evt.preventDefault()
        this.props.addCheckIn(this.props.user, this.props.venue)
    }
}

const mapProps = ({ verify }) => ({ verifyCheckIn: verify })

const mapDispatch = dispatch => ({
    addCheckIn: (user, place) => dispatch(addCheckIn(user, place))
})

export default connect(mapProps, mapDispatch)(Success)