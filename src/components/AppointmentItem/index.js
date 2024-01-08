// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props
  const {id, title, dateFormat, isStarred} = appointmentDetails

  const onStar = () => {
    toggleStarred(id)
  }
  const starStatus = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="title-star-div">
        <p className="title">{title}</p>

        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={onStar}
        >
          <img src={starStatus} alt="star" />
        </button>
      </div>
      <p className="date">{dateFormat}</p>
    </li>
  )
}

export default AppointmentItem
