import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// import { deleteTask } from '../store/asyncMethods/taskMethods';
import { BsFillPenFill, BsTrash } from "react-icons/bs";

class AllDataC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.data,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.data.length != state.task.length) {
      return {
        task: props.data
      }
    }
    return null;
  }
  clickEdit = (task) => {
    this.props.history.push({
      pathname: "/editTask",
      state: { task }
    });
  }
  render() {

    const deleteClick = (task) => {
      this.props.deleteTask(task._id);
    }
    return (
      <>
        {this.state.task.length > 0 ?
          <table border='1' cellPadding='5' cellSpacing='5' width="75%" >
            <thead>
              <tr>
                <th>Task</th>
                <th>Description </th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.task.map(t => (
                <tr key={t._id} >
                  <td>{t.task}</td>
                  <td>{t.description}</td>
                  <td>{t.status}</td>
                  <td>
                    <button onClick={() => this.clickEdit(t)} className='btn' id='edit-btn'  ><BsFillPenFill className='btns' />
                    </button>
                    <button className='btn' onClick={deleteClick.bind(this, t)} id='delete-btn' ><BsTrash className='btns' /></button></td>
                </tr>
              ))
              }
            </tbody>
          </table> : <><h5>No Task Found</h5></>
        }
      </>
    )
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteTask: (id) => dispatch(deleteTask(id)),
//   }
// }

AllDataC.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

AllDataC.defaultProps = {
  deleteTask: () => { },
  data: []

}
export default AllDataC;
