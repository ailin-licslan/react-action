import { useNavigate } from 'react-router-dom'

function Login () {

  //跳到关于页面
  const navigate = useNavigate()


  function toAbout () {
    //to about
    navigate('/about?id=100', { replace: true })
  }

  return <div>Login
    <button onClick={toAbout}>to about</button>
  </div>
}

export default Login