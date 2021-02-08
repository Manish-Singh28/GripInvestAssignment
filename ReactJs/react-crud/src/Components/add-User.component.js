import React, { Component } from "react";
import UserDataService from "../Services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      userId:"",
      UserName: "",
      email: "",  
      phone: " ",

      submitted: false
    };
  }

  componentDidMount() {
    this.setState ( {
      id: null,
      userId:"",
      UserName: "",
      email: "", 
      phone: " ",

      submitted: false
    });
  }

  onChangeUserName=(e)=> {
    this.setState({
      userName: e.target.value
    });
  }

  onChangeEmail=(e)=> {
    this.setState({
      email: e.target.value
    });
  }
  onChangeUserId=(e)=> {
    this.setState({
      userId: e.target.value
    });
  }
  onChangePhone=(e)=> {
    this.setState({
      phone: e.target.value
    });
  }

  saveUser=()=> {
    var data = {
      userName: this.state.userName,
      email: this.state.email,
      phone: this.state.phone,
      userId: this.state.userId
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          userId: response.data.userId,
          username: response.data.userName,
          phone: response.data.phone,
          email: response.data.email,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser=()=> {
    this.setState({
      id: null,
      userId: "",
      userName: "",
      email: "",
      phone: "",

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">User Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.userId}
                  onChange={this.onChangeUserId}
                  name="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeUserName}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeEmail}
                  name="description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangePhone}
                  name="title"
                />
              </div>
  
              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    
  }
}