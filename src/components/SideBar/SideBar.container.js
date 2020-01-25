import { connect } from 'react-redux';
import SideBar from './SideBar';
import { logout } from '../../store/authentication/actions';
import selectors from '../../store/authentication/reducers/selectors';

const mapStateToProps = state => {
  const selector = selectors(state);
  const session = selector.getSession();

  return {
    session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logout)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);