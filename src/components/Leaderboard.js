import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {

   const { userDetails } = this.props

    return (
      <div>
        <ul className='dashboard-list'>
          {userDetails.map(user => (
           <li key={user.id}>
                <div>{user.image}</div>
                <div>{user.name}</div>
                <div>{user.questionsAnswered}</div>
                <div>{user.questionsCreated}</div>
           </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const userDetails = Object.keys(users)
    .map((user) => {
      const tempUserDetails = {
        image: users[user].avatarURL,
        name: users[user].name,
        questionsAnswered: Object.keys(users[user].answers).length,
        questionsCreated: users[user].questions.length,
      };
      const rank = tempUserDetails.questionsAnswered + tempUserDetails.questionsCreated;
      tempUserDetails.rank = rank;
      return (tempUserDetails);
    })
    .sort((a, b) => (
      b.rank - a.rank
    ));
  return {
    userDetails,
  };
}


export default connect(mapStateToProps)(Leaderboard)
