import React from "react";
import Header from './Header';
import Search from './Search';
import API from "../utils/API";
import moment from "moment"
import "../styles/table.css";

const styles = {
  table: {
    margin: 30
  }
}
class Table extends React.Component {
  state = { result: [], originalResult: [], search: ""
  };

  componentDidMount() {
    this.searchTable("");
  }

  searchTable = query => {
    API.search(query)
      .then(res => {
        this.setState({ result: res.data.results, originalResult: res.data.results })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });

    const newResult = this.state.originalResult.length > 0 ? this.state.originalResult.filter(employee => {
      console.log(employee)
      return employee.name.first.toLowerCase().includes(value.toLowerCase()) ||
       employee.name.last.toLowerCase().includes(value.toLowerCase()) ||
        employee.email.toLowerCase().includes(value.toLowerCase()) || employee.cell.includes(value) || moment(employee.dob.date).format("MM/DD/YYYY").includes(value)
    }) : []
    this.setState({ result: newResult })
  };

  handleFormSubmit = colName => {
    let newResult = null

    if (colName === "first") {
      newResult = this.state.result.length > 0 ? this.state.result.sort((a, b) => a.name.first.localeCompare(b.name.first)) :
        []
    }
    else if (colName === "email") {
      newResult = this.state.result.length > 0 ? this.state.result.sort((a, b) => a.email.localeCompare(b.email)) :
        []
    }
    else if (colName === "dob") {
      newResult = this.state.result.length > 0 ? this.state.result.sort((a, b) => a.dob.date.localeCompare(b.dob.date)) :
        []
    }
    this.setState({ result: newResult })
  };

  render() {
    return (
      <div>
        <Header/>
        <Search
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <table style={styles.table} className="table table-responsive">
          <thead className="thead-dark">
            <tr>
              {/* where sortung comes into play */}
              <th scope="col">image</th>
              <th scope="col" onClick={() => { this.handleFormSubmit("first") }}>Name</th>
              <th scope="col">Phone</th>
              <th scope="col" onClick={() => { this.handleFormSubmit("email") }}>Email</th>
              <th scope="col" onClick={() => { this.handleFormSubmit("dob") }}>DOB</th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.length > 0 ?
              this.state.result.map((employee, index) => {
                return (<tr key={index}>
                  <td><img src={employee.picture.thumbnail} alt="employee" /></td>
                  <td>{employee.name.first + " " + employee.name.last}</td>
                  <td>{employee.cell}</td>
                  <td>{employee.email}</td>
                  <td>{moment(employee.dob.date).format("MM/DD/YYYY")}</td>
                </tr>)
              }) :
              ""
            }
          </tbody>
        </table>
        </div>
    );
  }
}

// exporting table to be used in other parts of the application
export default Table;

