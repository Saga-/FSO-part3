import '../index.css'

export const Notification = (props) => {
  const { msg } = props;

  if (msg === null) {
    return null;
  }

  if (msg.hasOwnProperty('success')) {
    return (
      <div className="success" >
        {msg.success}
      </div>
    )
  }

  if (msg.hasOwnProperty('error')) {
    return (
      <div className="error" >
        {msg.error}
      </div>
    )
  }



}

export default Notification
