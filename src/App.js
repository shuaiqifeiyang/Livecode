import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { GlobalStyle } from './style'
import { GlobalStyleIcon } from './statics/iconfont/iconfont.js'
import Header from './common/header/'
import Studentpage from './pages/student'
import Loginpage from './pages/login'
import Teacherpage from './pages/teacher'

import Debugpage from './pages/debug'

import store from './store'

class App extends Component {

  
  render() {
    return (
  
      
      <Provider store={store}>

        <div>
          <GlobalStyle/>
          <GlobalStyleIcon/>
          <Header />
          
          <BrowserRouter>
            <div>
              
              <Route path='/' exact component={ Loginpage }/> 

              <Route path='/student'  component={ Studentpage }/>  
              
              <Route path='/teacher'  component={ Teacherpage }/> 

              <Route path='/debug' component={Debugpage}/> 
            </div>  
          </BrowserRouter>
        
        </div>

      </Provider>
    
        
      
    );
  }
}

export default App;
