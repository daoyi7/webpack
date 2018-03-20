import app from './fuck'
import a from './a'
import b from './b'

if (module.hot) {
  debugger
  module.hot.accept('./app', app)
}

app()
