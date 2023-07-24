import React,{Component} from 'react';
import {variables} from './Variables.js'

export class Organization extends Component{

    constructor(props){
        super(props);

        this.state={
            organizations:[],
            modalTitle:"",
            OrganizationName:"",
            OrganizationType:"",
            OrganizationDescription:"",
            OrganizationCountryCode:"",
            OrganizationEmail:"",
            OrganizationPhone:"",
            OrganizationCode:"",
            Id:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'organizations').then(response => response.json()).then(data => {
            this.setState({organizations:data});
        });
    }

    componentDidMount(){
        this.refreshList();        
    }
    componentDidUpdate(){
        console.log(this.state.Id);
    }
    changeOrganizationName = (e) => {
        this.setState({OrganizationName: e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle: "Add Organization",
            Id: 0,
            OrganizationName:"",
            OrganizationType:"",
            OrganizationDescription:"",
            OrganizationCountryCode:"",
            OrganizationEmail:"",
            OrganizationPhone:"",
            OrganizationCode:""
        });
    }

    editClick(org){
        this.setState((state, props) => ({
            //counter: state.counter + props.increment,
            modalTitle: "Edit Organization",
            Id: org.Id,
            OrganizationName: org.OrganizationName,
            OrganizationType: org.OrganizationType,
            OrganizationDescription:org.OrganizationDescription,
            OrganizationCountryCode:org.OrganizationCountryCode,
            OrganizationEmail:org.OrganizationEmail,
            OrganizationPhone:org.OrganizationPhone,
            OrganizationCode:org.OrganizationCode
          }));    
    }

    render(){
        const{
            organizations,
            modalTitle,
            OrganizationName,
            OrganizationType,
            OrganizationDescription,
            OrganizationCountryCode,
            OrganizationEmail,
            OrganizationPhone,
            OrganizationCode,
            Id
        }=this.state;
        return(
            <div>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Organization
                </button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                Organization ID
                            </th>
                            <th>
                                Organization Name
                            </th>
                            <th>
                                Organization Type
                            </th>
                            <th>
                                Organization Description
                            </th>
                            <th>
                                Organization Country Code
                            </th>
                            <th>
                                Organization Country Name
                            </th>
                            <th>
                                Organization Email
                            </th>
                            <th>
                                Organization Phone
                            </th>
                            <th>
                                Organization Code
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations.map(org=> 
                            <tr key={org.Id}>
                                <td>{org.Id}</td>
                                <td>{org.OrganizationName}</td>
                                <td>{org.OrganizationType}</td>
                                <td>{org.OrganizationDescription}</td>
                                <td>{org.OrganizationCountryCode}</td>
                                <td>{org.OrganizationCountryName}</td>
                                <td>{org.OrganizationEmail}</td>
                                <td>{org.OrganizationPhone}</td>
                                <td>{org.OrganizationCode}</td>
                                <td>
                                    <button type="button" className='btn btn-light mr-1'  data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(org)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Organization Name</span>
                                        <input type="text" className="form-control" value={OrganizationName} onChange={this.changeOrganizationName}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Description</span>
                                        <input type="text" className="form-control" value={OrganizationDescription} onChange={this.changeOrganizationName}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Country Code</span>
                                        <input type="text" className="form-control" value={OrganizationCountryCode} onChange={this.changeOrganizationName}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Email</span>
                                        <input type="text" className="form-control" value={OrganizationEmail} onChange={this.changeOrganizationName}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Phone</span>
                                        <input type="text" className="form-control" value={OrganizationPhone} onChange={this.changeOrganizationName}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Code</span>
                                        <input type="text" className="form-control" value={OrganizationCode} onChange={this.changeOrganizationName}/>
                                    </div>

                                    {Id==0?
                                    <button type="button" className="btn btn-primary float-start">
                                        Create
                                    </button>
                                    :null}

                                    {Id!=0?
                                    <button type="button" className="btn btn-primary float-start">
                                        Update
                                    </button>
                                    :null}

                                </div>

                            </div>
                        </div> 
                    </div>
            </div>
        )
    }
}