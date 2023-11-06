import './comments.css'

const Comments = (props) => {
  return (
    <div className="comments">
      <div className="commentsWrapper">
        <div className="profileImg">
          <img src="" alt="" />
        </div>
        <div className="commentsRight">
          <div className="commentsUserFullname">
            <span>Ankit Ydv</span>
          </div>
          <div className="commentsUserUsername">
            @ankitydv1124
          </div>

        </div>
      </div>
    </div>
  )
}

export default Comments