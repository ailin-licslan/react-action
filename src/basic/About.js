import { useSearchParams } from 'react-router-dom'

function About () {
  const [params] = useSearchParams()
  const id = params.get('id')
  console.log('id is =========>', id)
  return <div>about id is {id}</div>
}

export default About