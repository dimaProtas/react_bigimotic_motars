import React from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

//вытащил из sate состояние аутентификации(залогинен или нет пользователь)
let mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }
//компонент оборачивает другие компоненты и редиректит их
export const withAuthRedirectComponent = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            return <Component {...this.props} />
        }
    }
    //компаненту для редиректа обернули еще раз, что бы она пришла уже с состоянием
    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)

    return ConnectAuthRedirectComponent
      
}

export default withAuthRedirectComponent

