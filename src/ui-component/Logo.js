// material-ui
import logo from "../assets/images/icons/logo.png";
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = (prop) => {
  

  return (

    <img src={logo} alt="Berry" width={prop.size} height="100" />
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
  );
};

export default Logo;
