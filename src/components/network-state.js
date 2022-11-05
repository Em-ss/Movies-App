export const NetworkState = ({ onNetworkState }) => {
  window.onoffline = () => {
    onNetworkState();
  };
  window.ononline = () => {
    onNetworkState();
  };
};
