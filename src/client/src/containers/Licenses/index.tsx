import * as React from "react";
import { connect } from "react-redux";
import { getFrameworkLicensesSelector } from "../../selectors/licenseSelector";

const Licenses = (props: any) => {
  React.useEffect(() => {
    console.log(props);
  }, [props.frameworkLicenses]);
  return <div>Licenses</div>;
};

const mapStateToProps = (state: any) => ({
  frameworkLicenses: getFrameworkLicensesSelector(state)
});

export default connect(mapStateToProps)(Licenses);
