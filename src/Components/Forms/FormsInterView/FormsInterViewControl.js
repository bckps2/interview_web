import React from "react";
import FormInterView from "./FormInterview";
import requestHttp from "../../../Services/HttpService";
// import { urlBaseInterView } from '../../../Models/Url';+

class FormInterViewControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let register = this.createFormInterView(event);
    requestHttp(
      "https://interview.apireport.com/api/InterView/AddInterView",
      "post",
      register
    )
      .then((response) => response.text())
      .then((res) => {
        alert(res);
      })
      .catch((rsjx) => {
        alert(rsjx);
      })
      .finally(() => event.target.reset());
  }

  createFormInterView(event) {
    return {
      company: event.target.company.value,
      informationInterViews: [
        {
          interViewIdInterView: 0,
          typeInterView: event.target.typeInterView.value,
          nameInterViewers: [
            event.target.entrevistador1.value,
            event.target.entrevistador2.value,
            event.target.entrevistador3.value,
          ],
          dateInterView: event.target.dateInterView.value,
          email: event.target.email.value,
        },
      ],
      rangeSalarial: event.target.rangeSalarial.value,
    };
  }

  render() {
    let props = {
      handleSubmit: this.handleSubmit,
    };
    return <FormInterView data={props} />;
  }
}

export default FormInterViewControl;
