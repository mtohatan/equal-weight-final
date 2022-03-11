import * as React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";

import ClsProductsGrid from "./Components/ClsProductsGrid";

const editField = "inEdit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ checked: event.value });
  };

  render() {
    //alert("state: " + this.state.checked);
    return (
      <div>
        <Checkbox
          defaultChecked={false}
          checked={this.state.checked}
          onChange={this.handleChange}
          label={"Worst Basket"}
        />
        <ClsProductsGrid worstBasket={this.state.checked} />
      </div>
    );
  }
}

export default App;
