import React,{Component} from 'react';
import {variables} from './Variables.js'

export class Project extends Component{

    constructor(props){
        super(props);

        this.state={
            projects:[],
            modalTitle:"",
            PROJECT_NAME:"",
            PROJECT_DESCRIPTION:"",
            PROJECT_CODE:"",
            PROJECT_ORGANIZATION_CODE:"",
            PROJECT_FUND:"",
            PROJECT_TARGET_FUND:"",
            Id:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'projects').then(response => response.json()).then(data => {
            this.setState({projects:data});
            console.log(data);
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
    
    addButtonClick(){
        this.setState({
            modalTitle: "Add New Project",
            Id: 0,
            PROJECT_NAME:"",
            PROJECT_DESCRIPTION:"",
            PROJECT_CODE:"",
            PROJECT_ORGANIZATION_CODE:"",
            PROJECT_FUND:"",
            PROJECT_TARGET_FUND:""
        });
    }

    // deleteButtonClick(proj){
    //     this.setState((state, props) => ({
    //         //counter: state.counter + props.increment,
    //         modalTitle: "Delete Project",
    //         Id: proj.Id
    //       }));    
    // }
    editButtonClick(proj){
        this.setState((state, props) => ({
            //counter: state.counter + props.increment,
            modalTitle: "Add New Project",
            Id: 0,
            PROJECT_NAME :               proj.PROJECT_NAME,
            PROJECT_DESCRIPTION :        proj.PROJECT_DESCRIPTION,
            PROJECT_CODE :               proj.PROJECT_CODE,
            PROJECT_ORGANIZATION_CODE :   proj.PROJECT_ORGANIZATION_CODE,
            PROJECT_FUND :               proj.PROJECT_FUND,
            PROJECT_TARGET_FUND :         proj. PROJECT_TARGET_FUND           
          }));    
    }

    createOrEditNewProject(){
        fetch(variables.API_URL + 'projects',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id: this.state.Id,
                PROJECT_NAME : this.state.PROJECT_NAME,
                PROJECT_DESCRIPTION : this.state.PROJECT_DESCRIPTION,
                PROJECT_CODE : this.state.PROJECT_CODE,
                PROJECT_ORGANIZATION_CODE : this.state.PROJECT_ORGANIZATION_CODE,
                PROJECT_FUND : this.state.PROJECT_FUND,
                PROJECT_TARGET_FUND : this.state.PROJECT_TARGET_FUND
            })
        }).then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error)=>{
            alert('Failed');
        })
    }

    deleteProject(proj){
        this.setState((state, props) => ({
            //counter: state.counter + props.increment,
            Id: proj.Id
          }));    

        if(window.confirm('Are you sure?')){   
            this.setState((state, props) => ({
                Id: proj.Id
              }));         
        fetch(variables.API_URL+'organizations/'+proj.Id,{
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
            projects,
            modalTitle,
            PROJECT_NAME,
            PROJECT_DESCRIPTION,
            PROJECT_CODE,
            PROJECT_ORGANIZATION_CODE,
            PROJECT_FUND,
            PROJECT_TARGET_FUND,
            Id
        }=this.state;

        return(
            <div>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                onClick={()=>this.addButtonClick()}>
                    Add Project
                </button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                Project ID
                            </th>
                            <th>
                                Project Name
                            </th>
                            <th>
                                Project Description
                            </th>
                            <th>
                                Project Code
                            </th>
                            <th>
                                Project Organization Code
                            </th>
                            <th>
                                Project Fund
                            </th>
                            <th>
                                Project Target Fund
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(proj=> 
                            <tr key={proj.Id}>
                                <td>{proj.Id}</td>
                                <td>{proj.PROJECT_NAME}</td>
                                <td>{proj.PROJECT_DESCRIPTION}</td>
                                <td>{proj.PROJECT_CODE}</td>
                                <td>{proj.PROJECT_ORGANIZATION_CODE}</td>
                                <td>{proj.PROJECT_FUND}</td>
                                <td>{proj. PROJECT_TARGET_FUND}</td>
                                <td>
                                    <button type="button" className='btn btn-light mr-1'  data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                onClick={()=>this.editButtonClick(proj)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1' data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                onClick={()=>this.deleteProject(proj)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
                    <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Project Name</span>
                                        <input name='PROJECT_NAME' value={PROJECT_NAME} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Project Description</span>
                                        <input name='PROJECT_DESCRIPTION' value={PROJECT_DESCRIPTION} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Project Code</span>
                                        <input name='PROJECT_CODE' value={PROJECT_CODE} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Project Organization Code</span>
                                        <input name='PROJECT_ORGANIZATION_CODE' value={PROJECT_ORGANIZATION_CODE} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Project Fund</span>
                                        <input name='PROJECT_FUND' value={PROJECT_FUND} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Project Target Fund</span>
                                        <input name='PROJECT_TARGET_FUND' value={PROJECT_TARGET_FUND} type="text" className="form-control" onChange={this.changeFormElements}/>
                                    </div>

                                    {Id==0?
                                    <button type="button" className="btn btn-primary float-start" onClick={()=>this.createOrEditNewProject()}> 
                                        Create
                                    </button>
                                    :null}

                                    {Id!=0?
                                    <button type="button" className="btn btn-primary float-start"
                                    onClick={()=>this.createOrEditNewProject()}>
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