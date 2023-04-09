import { Component } from 'react'
import { Provider } from 'react-redux'
import createApp from './dva'
import modules from './store'
import './app.scss'


const dvaApp = createApp({
  initialState: {},
  modules,
})
const store = dvaApp.getStore();
class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
