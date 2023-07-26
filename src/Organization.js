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
            OrganizationCountryName:"",
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
    changeFormElements = (e) => {
        //e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleChange(){
        console.log(document.getElementById("orgName").value);
    }

    addClick(){
        this.setState({
            modalTitle: "Add Organization",
            Id: 0,
            OrganizationName:"",
            OrganizationType:"",
            OrganizationDescription:"",
            OrganizationCountryCode:"",
            OrganizationCountryName:"",
            OrganizationEmail:"",
            OrganizationPhone:"",
            OrganizationCode:""
        });
    }

    deleteClick(org){
        this.setState((state, props) => ({
            //counter: state.counter + props.increment,
            modalTitle: "Delete Organization",
            Id: org.Id
          }));    
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
            OrganizationCountryName:org.OrganizationCountryName,
            OrganizationEmail:org.OrganizationEmail,
            OrganizationPhone:org.OrganizationPhone,
            OrganizationCode:org.OrganizationCode
          }));    
    }

    createClick(){
        fetch(variables.API_URL + 'organizations',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id: this.state.Id,
                OrganizationName: this.state.OrganizationName,
                OrganizationType: this.state.OrganizationType,
                OrganizationDescription: this.state.OrganizationDescription,
                OrganizationCountryCode: this.state.OrganizationCountryCode,
                OrganizationCountryName: this.state.OrganizationCountryName,
                OrganizationEmail: this.state.OrganizationEmail,
                OrganizationPhone: this.state.OrganizationPhone,
                OrganizationCode: this.state.OrganizationCode
            })
        }).then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error)=>{
            alert('Failed');
        })
    }

    deleteClick(org){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'organizations/'+org.Id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }


    render(){
        const{
            organizations,
            modalTitle,
            OrganizationName,
            OrganizationType,
            OrganizationDescription,
            OrganizationCountryCode,
            OrganizationCountryName,
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
                                    <button type="button" className='btn btn-light mr-1' data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.deleteClick(org)}>
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
                                        <input name='OrganizationName' value={OrganizationName} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>
                                    {/* value={OrganizationName} */}
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Type</span>
                                        <input name='OrganizationType' value={OrganizationType} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>
                                    {/* onChange={this.changeOrganizationName} */}

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Description</span>
                                        <input name='OrganizationDescription' value={OrganizationDescription} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Country Code</span>
                                        <input name='OrganizationCountryCode' value={OrganizationCountryCode} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Country Name</span>
                                        <input name='OrganizationCountryName' value={OrganizationCountryName} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Email</span>
                                        <input name='OrganizationEmail' value={OrganizationEmail} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Phone</span>
                                        <input name='OrganizationPhone' value={OrganizationPhone} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Code</span>
                                        <input name='OrganizationCode' value={OrganizationCode} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    {Id==0?
                                    <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}> 
                                        Create
                                    </button>
                                    :null}

                                    {Id!=0 && modalTitle == "Edit Organization" ?
                                    <button type="button" className="btn btn-primary float-start"
                                    onClick={()=>this.createClick()}>
                                        Update
                                    </button>
                                    :null}

                                    {Id!=0 && modalTitle == "Delete Organization" ?
                                    <button type="button" className="btn btn-primary float-start"
                                    onClick={()=>this.deleteOrg()}>
                                        Delete
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