import React, { Component } from "react";
import Aux from "../Auxilliary";
import Modal from "../../components/Ui/Modal/Modal";
import { render } from "@testing-library/react";
const withErrorHandler = (WarraperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }
    errorHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal clicked={this.errorHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WarraperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
