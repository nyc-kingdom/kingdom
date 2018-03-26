import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'

export class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: 'kingdoms'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.top10 = this.top10.bind(this)
    }

    componentDidMount(){
        this.props.fetchUsers()
    }

    render(){
        console.log("are you there yet?", this.state.show)
        return (
            <div>
                <div style={{height: '5vh'}}/>
                <div>
                    <h2>Leader Boards</h2>
                </div>
                <form onClick={this.handleSubmit} style={{display: 'flex'}} >
                    <div style={{flex: 1}} >
                        <button name="users">
                            Users
                        </button>
                    </div>
                    <div style={{flex: 1}}>
                        <button name="kingdoms">
                            Kingdoms
                        </button>
                    </div>
                    <div style={{flex: 1}}>
                        <button name="establishments">
                            Establishments
                        </button>
                    </div>
                </form>
                <div>
                    {
                        !this.props.users ? null : this.top10()
                    }
                </div>
            </div>
        )
    }

    top10(){
        const chosen = this.state.show
        const chosenGroup = this.props[chosen]
        const points = chosen === "kingdoms" ? "experience" : "quantity"
        const checkFor = chosen === "kingdoms" ? "users" : "checkins"
        const top5 = !chosenGroup
            ? []
            : chosen === "users"
                ? chosenGroup.sort((a, b) => b.experience - a.experience).slice(0, 5)
                : chosenGroup.sort((a, b) => b[checkFor].reduce((accu, curr) => accu + curr[points], 0) - a[checkFor].reduce((accu, curr) => accu + curr[points], 0))
        console.log(top5)
        return (
            <div>
                {
                    top5.map(one => (
                        <div key={one.id}>
                            
                        </div>
                    ))
                }
            </div>
        )
    }

    handleSubmit(evt){
        evt.preventDefault()
        this.setState({show: evt.target.name})
    }
}

const mapProps = state => {
    return {
        users: state.users,
        kingdoms: state.kingdoms,
        establishments: state.establishments
    }
}

const mapDispatch = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapProps, mapDispatch)(Profile)
