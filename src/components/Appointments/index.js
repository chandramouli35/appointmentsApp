// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

const masterList = []
class Appointments extends Component {
  state = {
    title: '',
    dateFormat: null,
    dateInput: null,
    appointmentsList: masterList,
    starOption: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, dateFormat} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      dateFormat,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      dateFormat: null,
      dateInput: 0,
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const dateInput = event.target.value
    const newDate = new Date(dateInput)
    const date = format(newDate, 'dd MMMM yyyy, EEEE')
    this.setState({dateFormat: date, dateInput})
  }

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onStarred = () => {
    this.setState(prevState => ({starOption: !prevState.starOption}))
  }

  render() {
    const {title, dateInput, starOption} = this.state
    const starredBtnClass = starOption ? 'starred-btn' : 'unstarred-btn'
    let {appointmentsList} = this.state
    if (starOption === true) {
      appointmentsList = appointmentsList.filter(
        each => each.isStarred === true,
      )
    }

    return (
      <div className="main-div">
        <div className="main-card">
          <div>
            <h1 className="main-head">Add Appointment</h1>
            <div className="header-cont">
              <form className="form-div" onSubmit={this.addAppointment}>
                <label className="label-el" htmlFor="name">
                  TITLE
                </label>
                <input
                  className="input-cont"
                  type="text"
                  id="name"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label className="label-el" htmlFor="dateEl">
                  DATE
                </label>
                <input
                  className="input-cont"
                  type="date"
                  id="dateEl"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>

              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="apps-img"
                />
              </div>
            </div>
          </div>
          <hr className="line-el" />
          <div className="appointments-div">
            <h1 className="appointments-head">Appointments</h1>

            <button
              className={`${starredBtnClass}`}
              type="button"
              onClick={this.onStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments">
            {appointmentsList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                toggleStarred={this.toggleStarred}
                appointmentDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
