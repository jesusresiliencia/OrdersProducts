import React,{Component} from 'react'
import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';

const url="http://localhost:8080//api/orders/list";
const url_post="http://localhost:8080/api/orders/add";


export default class Orders extends Component{

    state={
        data:[]       
      }

      peticionGet=()=>{
        axios.get(url).then(response=>{
          this.setState({data:response.data});
        }).catch(error=>{
          console.log(error.message);
        });
      }

      componentDidMount(){
        this.peticionGet();
        }

    render(){
        const {form}=this.state;
        return(<div>
            <br/>
            <button className="btn btn-success" onClick={()=>{this.setState({form:null,modal_type:'insert'}); this.modalSave()}}>Add Order</button>
            <br/><br/>
            <table className="table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.data.map(order=>{
                   return(
                     <tr>
                       <td>{order.orderNumber}</td>
                       <td>{order.status==1?'Active':'Inactive'}</td>
                       <td>{order.date}</td>
                       <td>{order.customer}</td>
                       <td>$ {order.total}</td>
                       <td><button className="btn btn-primary">Edit</button>
                       {"    "}
                       <button className="btn btn-danger">Delete</button>
                       </td>
                     </tr>
         
                   )
         
                 })}
              </tbody>
            </table>
        </div>)
    }}