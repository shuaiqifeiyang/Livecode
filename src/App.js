import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { GlobalStyle } from './style'
import { GlobalStyleIcon } from './statics/iconfont/iconfont.js'

import Studentpage from './pages/student'
import Loginpage from './pages/login'
import Teacherpage from './pages/teacher'
import Coverpage from './pages/cover'

import Debugpage from './pages/debug'

import store from './store'

class App extends Component {

  
  render() {
    return (
  
      
      <Provider store={store}>

        <div>
          <GlobalStyle/>
          <GlobalStyleIcon/>
          
          <BrowserRouter>
            <div>
              <Route path='/' exact component={ Coverpage } /> 

              <Route path='/login' exact component={ Loginpage }/> 

              <Route path='/student' exact component={ Studentpage }/>  
              
              <Route path='/teacher' exact component={ Teacherpage }/> 

              <Route path='/debug' exact component={Debugpage}/> 
            </div>  
          </BrowserRouter>
        
        </div>

      </Provider>
    
        
      
    );
  }
}

export default App;
