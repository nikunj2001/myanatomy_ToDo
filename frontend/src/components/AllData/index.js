import { connect } from "react-redux";
import AllDataC from "./AllDataC";
import { mapDispatchToProps } from "./props";
import { withRouter } from "react-router-dom";
export default withRouter(connect(null, mapDispatchToProps)(AllDataC));