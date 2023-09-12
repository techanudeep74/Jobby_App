import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Navbar = props => {
  const executeLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav>
      <div className="large-nav-bar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <button type="button" onClick={executeLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="mobile-nav-bar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul>
          <li>
            <Link to="/">
              <MdHome />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsBriefcase />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="mobile-btn"
              onClick={executeLogout}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
