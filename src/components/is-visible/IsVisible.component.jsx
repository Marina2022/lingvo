const IsVisible = (props) => {
   const { isVisible, children } = props;
   return isVisible ? children : null;
};

export default IsVisible;
