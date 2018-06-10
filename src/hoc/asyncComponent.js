import React, {Component} from "react";

const asyncComponent = passedComponent => {
   return class extends Component {
      state = {
         component: null
      };

      componentDidMount(){
         passedComponent()
            .then(component => this.setState({component: component.default}))
            .catch(error => error);
      }

      render(){
         let Comp = this.state.component;
         return Comp ? <Comp {...this.props} /> : null;
      }
   }
}

export default asyncComponent;