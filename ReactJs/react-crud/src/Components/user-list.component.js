import React, { Component } from "react";
import UserDataService from "../Services/user.service";
import DropdownSelectChip from "./../commonComponent/dropdownChip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider
} from '@material-ui/core';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUserName = this.onChangeSearchUserName.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchUserName = this.searchUserName.bind(this);

    this.state = {
      users: [],
      allClients: [],
      searchUserName: "",
      selectedItem: [],
      tableList:[]
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUserName(e) {
    const searchUserName = e.target.value;

    this.setState({
      searchUserName: searchUserName
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data,
          allClients:response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchUserName() {
    //for calling backend Api

    // UserDataService.findByUserName(this.state.searchUserName)
    //   .then(response => {
    //     this.setState({
    //       users: response.data
    //     });
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

    //filter the records 
    var searchArr =[]
    this.state.selectedItem.forEach(item => {
      searchArr.push(this.state.allClients.filter(i => i.userName === item));
    });
    this.setState({ 
      tableList:searchArr
    })
  }

  handleChange = selectedItem => {
    if (this.state.selectedItem.includes(selectedItem)) {
      this.removeSelectedItem(selectedItem);
    } else {
      this.addSelectedItem(selectedItem);
    }
  };

  
  addSelectedItem(item) {
    this.setState(({ selectedItem,users }) => ({
      inputValue: "",
      selectedItem: [...selectedItem, item],
      users: users.filter(i => i.userName !== item)
    }));
  }

  removeSelectedItem = item => {
    this.setState(({ selectedItem, users }) => ({
      inputValue: "",
      selectedItem: selectedItem.filter(i => i !== item),
      users: [...users, { userName: item, id: item.toLowerCase() }]
    }));
  };

  handleChangeInput = inputVal => {
    const t = inputVal.split(",");
    if (JSON.stringify(t) !== JSON.stringify(this.state.selectedItem)) {
      this.setState({ inputValue: inputVal });
    }
  };


  render() {
    const { users,selectedItem,tableList } = this.state;

    return (
      <div className="list row" >
         <p className="title">Select search in:</p>
        
        <ul style={{display:'flex', flexDirection:'row'}}>
          <ul>
            <label>
              <input
                type="radio"
                value="Client"
                checked={true}
                // disabled='true'
              />
              Client
            </label>
          </ul>
          
          <ul>
            <label>
              <input
                type="radio"
                value="assets"
                checked={false}
                disabled='true'
              />
              Assets
            </label>
          </ul>

          <ul>
            <label>
              <input
                type="radio"
                value="order"
                checked={false}
                disabled='true'
              />
              Order
            </label>
          </ul>
        </ul>
        <div className="col-md-12" style={{marginTop:'48px'}}>
          <span className="input-group mb-3">
            <div  style={{margin:'auto'}}>
          <DropdownSelectChip
            onInputValueChange={this.handleChangeInput}
            inputValue={this.state.inputValue}
            availableItems={users}
            selectedItem={selectedItem}
            onChange={this.handleChange}
            onRemoveItem={this.removeSelectedItem}
          />
            </div>
          </span>
          <span className="input-group-append">
              <button style={{margin:'auto'}}
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUserName}
              >
                Search
              </button>
            </span>
        </div>
        <Divider />
        {this.state.tableList.length>0 ? 
        <div className="col-md-12"  style={{marginTop:'48px'}}>
          <Card>
            <CardContent >

            
        <Table
          height={"auto"}
          fixedHeader={true}
          fixedFooter={true}
          selectable={true}
          multiSelectable={true}
        >
          <TableHead style={{ backgroundColor: "cadetblue" }}>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Client Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            </TableRow>
        </TableHead>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={true}
            showRowHover={true}
          >
            {tableList.map( (row, index) => (
              <TableRow key={index}>
                <TableCell align="right">{index}</TableCell>
                <TableCell align="right">{row[0].userName}</TableCell>
                <TableCell align="right">{row[0].email}</TableCell>
                <TableCell align="right">{row[0].phone}</TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        </CardContent>
          </Card>
         

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        :''}
      </div>
    );
  }
}