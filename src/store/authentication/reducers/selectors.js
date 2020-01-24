export default function selectors(globalState) {
  const state = globalState.authentication;
  const getSession = () => state.session;
  const getLogInStatus = () => state.logInFetchStatus.status;
  const getCheckTokenStatus = () => state.checkTokenFetchStatus.status;

  return {
    getSession,
    getLogInStatus,
    getCheckTokenStatus
  };
}