import React from 'react';
import Auth from '../modules/Auth';
// import Dashboard from '../components/Dashboard.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import {Chart} from 'react-google-charts';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const initialActivityFields = [ ["Activities","Count"]
  , ["edt",0]
  , ["docsearch",0]
  , ["stream",0]
  , ["notebook",0]
  , ["email",0]
  , ["email_sent",0]
  , ["plotter",0]
  , ["mosaic",0]
  , ["watchlist_manager",0]
  , ["excel",0]
  , ["iphone",0]
  , ["ipad",0]
  , ["comps",0]
  ]

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      userdata:[],
      searchterm: 'john',
      section: 'sum',
      lastToggleOn: true, // toggle between first and last windows
      autocompletearray: [],
      selectedUsers: [],
      modalOpen: false
    };
  }

  /**
   * For pulling the API data
   */
  pullUserdata(searchterm) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/userdata/' + searchterm);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      // console.log('message:',xhr.response.message);
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          userdata: xhr.response.userdata
        });
      }
    });
    xhr.send();
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          autocompletearray: xhr.response.users
        });
      }
    });
    xhr.send();
  }



  handleUpdateInput(searchText) {
    this.setState({
      searchterm: searchText,
    });
  };

  handleNewRequest(searchText) {
    this.pullUserdata(searchText)
  };
  handleToggleFirstLast(e,isInputChecked) {
    this.setState({lastToggleOn: isInputChecked})
  };
  handleDropDownChange(event, index, value) {
    this.setState({section: value})
  };

  handleModalOpen() {
    this.setState({modalOpen: true});
  };
  handleModalClose() {
    this.setState({modalOpen: false});
  };

  updateSelectedRows(x){
    console.log(x, this.state.userdata.length, this.state.selectedUsers.length)
    if (this.state.userdata.length == this.state.selectedUsers.length) { //address materialUI table bug
      this.setState({selectedUsers:[]})
    } else if (x === "all") {
      this.setState({selectedUsers:Array.apply(null, {length: this.state.userdata.length}).map(Number.call, Number)})
    } else {
      this.setState({selectedUsers:x === "none" ? [] : x})
    }
    // this.setState({selectedUsers:x === "all"?
    //   Array.apply(null, {length: this.state.userdata.length}).map(Number.call, Number) :
    //   (x === "none" ? [] : x)})
  };
  /**
   * Render the component.
   */
  render() {

    var activityBreakdown = JSON.parse(JSON.stringify(initialActivityFields)) // shallow copy
    this.state.selectedUsers ? this.state.selectedUsers.forEach((x)=>{ //x = rownumber of userdata
      for (var i=1;i<activityBreakdown.length;i++){ //i = the field
        const fieldname = activityBreakdown[i][0];
        const fieldvalu = activityBreakdown[i][1];
        activityBreakdown[i] = [fieldname,fieldvalu + this.state.userdata[x][fieldname + "_alltime"]]
      }
    }) : console.log("no users selected")
    // console.log(activityBreakdown);
    //donut chart shows activity breakdown
    const donutviz = (<div key="2" className="my-pretty-chart-container">
        <Chart
          chartType="PieChart" 
          // data={data}
          data={activityBreakdown}
          options={{title:"Session Time Breakdown of Selected Users"
              ,pieHole:0.4}}
          // graph_id={"LineChart"}
          pieSliceText="label"
          width="100%"
          height="400px"
          // legend_toggle
        />
      </div>)
    // {"chartTitle":"DonutChart"
    // ,"chartType":"PieChart"
    // ,"width":"100%"
    // ,"data":[[["Task","Hours per Day"],["Work",11],["Eat",2],["Commute",2],["Watch TV",2],["Sleep",7]]]
    // ,"options":{"title":"My Daily Activities","pieHole":0.4}}


    return (
            <Paper className="container" style={{ padding:"10px" }} zDepth={5}>
              <Card>
                {this.state.secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{this.state.secretData}</CardText>}
              </Card>
              {donutviz}
              <div>
                <AutoComplete
                  floatingLabelText="Search by name, email, org"
                  searchText={this.state.searchterm}
                  onUpdateInput={this.handleUpdateInput.bind(this)}
                  onNewRequest={this.handleNewRequest.bind(this)}
                  dataSource={this.state.autocompletearray}
                  filter={AutoComplete.fuzzyFilter}
                  openOnFocus={true}
                  style={{ borderWidth: 5,margin: 0, textAlign: "left", color: "darkblue" }}
                />
                <SelectField
                  floatingLabelText="Field Name"
                  floatingLabelStyle={{ color: "darkblue" }}
                  value={this.state.section}
                  maxHeight={300}
                  onChange={this.handleDropDownChange.bind(this)}
                >
                  <MenuItem value={"sum"} primaryText="Sum (All features)" />
                  <MenuItem value={"edt"} primaryText="EDT" />
                  <MenuItem value={"docsearch"} primaryText="DocSearch" />
                  <MenuItem value={"stream"} primaryText="Stream" />
                  <MenuItem value={"notebook"} primaryText="Notebook" />
                  <MenuItem value={"email"} primaryText="Email" />
                  <MenuItem value={"email_sent"} primaryText="Email Sent" />
                  <MenuItem value={"plotter"} primaryText="Plotter" />
                  <MenuItem value={"mosaic"} primaryText="Mosaic" />
                  <MenuItem value={"watchlist_manager"} primaryText="Watchlist Manager" />
                  <MenuItem value={"general"} primaryText="General" />
                  <MenuItem value={"excel"} primaryText="Excel" />
                  <MenuItem value={"iphone"} primaryText="iPhone" />
                  <MenuItem value={"ipad"} primaryText="iPad" />
                  <MenuItem value={"comps"} primaryText="Comps" />
                  <MenuItem value={"rts"} primaryText="RTS" />
                </SelectField>
                <Paper style={{display: 'inline-block', padding:"10px"}} zDepth={1} >
                <Toggle
                  label="First <-> Last:"
                  defaultToggled={true}
                  onToggle={this.handleToggleFirstLast.bind(this)}
                  style={{
                    maxWidth: 200,
                    color: "darkblue" 
                  }}
                />
                </Paper>
                <FlatButton label="Help" onTouchTap={this.handleModalOpen.bind(this)} primary={true} />
                    <Dialog
                    title="Swyx Analytics Help"
                    modal={false}
                    open={this.state.modalOpen}
                    onRequestClose={this.handleModalClose.bind(this)}
                  >
                    <p>all numbers here are in terms of minutes according to our devs' calculation algorithm. I have no part in that.</p>
                    <p>no, we cannot sort the tables yet, this is a limitation of the table element we are using.</p>
                    <p>our data only begins from july 2016. so the "first 1wk/2wk/1mth" is calculated from july 2016 for those who have been with us before then.</p>
                    <p>let shawn know if there are any UI bugs found.</p>
                  </Dialog>
              </div>
              <br />
                <Table multiSelectable height="400px" onRowSelection={selectedRows => this.updateSelectedRows(selectedRows)}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn tooltip="tbd" style={{fontSize:"1.2em"}}>User</TableHeaderColumn>
                      <TableHeaderColumn tooltip="tbd" style={{fontSize:"1.2em"}}>Data Range</TableHeaderColumn>
                      <TableHeaderColumn tooltip="tbd" style={{ width: 25, fontSize:"1em" }}>Cust?</TableHeaderColumn>
                      <TableHeaderColumn tooltip="tbd" style={{ width: 40, fontSize:"1.1em" }}>Alltime</TableHeaderColumn>
                      <TableHeaderColumn tooltip="tbd" style={{ width: 25 }}>{this.state.lastToggleOn ? "Last" : "First"} 1wk</TableHeaderColumn>
                      <TableHeaderColumn tooltip="tbd" style={{ width: 30 }}>{this.state.lastToggleOn ? "Last" : "First"} 2wk</TableHeaderColumn>
                      <TableHeaderColumn tooltip="tbd" style={{ width: 40 }}>{this.state.lastToggleOn ? "Last" : "First"} 1mth</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody stripedRows deselectOnClickaway={false}>
                      {this.state.userdata.length < 1 ? "No Match Found" : this.state.userdata.map((x) => {
                        return (
                    <TableRow key={x.username}>
                        <TableRowColumn>{x.first_name} {x.last_name} <br /> {x.username} <br /> {x.email}</TableRowColumn>
                        <TableRowColumn>{new Date(x.date_joined).toDateString()} - <br/> {new Date(x.last_activity_date).toDateString()}</TableRowColumn>
                        <TableRowColumn style={{ width: 25 }}>{x.customer_flag == "True" ? "✔" : ""}</TableRowColumn>
                        <TableRowColumn style={{ width: 40 }}>{x[this.state.section + "_alltime"]}</TableRowColumn>
                        <TableRowColumn style={{ width: 25 }}>{x[this.state.section + "_" + (this.state.lastToggleOn ? "last" : "first") + "_1w"]}</TableRowColumn>
                        <TableRowColumn style={{ width: 30 }}>{x[this.state.section + "_" + (this.state.lastToggleOn ? "last" : "first") + "_2w"]}</TableRowColumn>
                        <TableRowColumn style={{ width: 40 }}>{x[this.state.section + "_" + (this.state.lastToggleOn ? "last" : "first") + "_1m"]}</TableRowColumn>
                    </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
            </Paper>);
  }

}

export default DashboardPage;


                // <DropDownMenu value={this.state.section} onChange={this.handleDropDownChange.bind(this)}>





// const dropdowndict = {1:'rts',
//     2:'comps',
//     3:'docsearch',
//     4:'edt',
//     5:'email',
//     6:'email_sent',
//     7:'excel',
//     8:'general',
//     9:'ipad',
//     10:'iphone',
//     11:'mosaic',
//     12:'notebook',
//     13:'plotter',
//     14:'stream',
//     15:'sum',
//     16:'watchlist_manager'}

// const initialActivityFields = [ ["Activities","Count"]
//   , ["EDT",0]
//   , ["DocSearch",0]
//   , ["Stream",0]
//   , ["Notebook",0]
//   , ["Email",0]
//   , ["Email Sent",0]
//   , ["Plotter",0]
//   , ["Mosaic",0]
//   , ["Watchlist Manager",0]
//   , ["General",0]
//   , ["Excel",0]
//   , ["iPhone",0]
//   , ["iPad",0]
//   , ["Comps",0]
//   ]