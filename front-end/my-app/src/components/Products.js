import '../App.css';
import axios from "axios";
import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';

const url="http://localhost:8080/api/products";
const url_post="http://localhost:8080/api/add";
const url_put="http://localhost:8080/api/product";
const url_delete="http://localhost:8080/api/product";

export default class Products extends Component{

    state={
        data:[],
        modalSave:false,
        modalDelete:false,
        form:{
          id:'',
          name:'',
          category:'',
          unit_price:'',
          status:''
        }
      }
      
      peticionGet=()=>{
        axios.get(url).then(response=>{
          this.setState({data:response.data});
        }).catch(error=>{
          console.log(error.message);
        });
      }
      
      actionPost=async ()=>{
        delete this.state.form.id;
        await axios.post(url_post,this.state.form).then(response=>{
          this.modalSave();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        });
      }
      
      actionPut=()=>{
        axios.put(url_put+"/"+this.state.form.id,this.state.form).then(response=>{
          this.modalSave();
          this.peticionGet();
        });
      }
      
      actionDelete=()=>{
        axios.delete(url_delete+"/"+this.state.form.id).then(response=>{
          this.setState({modalDelete:false});
          this.peticionGet();
        });
      }
      
      
      modalSave=()=>{
        this.setState({modalSave:!this.state.modalSave});
      }
      
      selectOrder=(order)=>{
        this.setState({
          modal_type:'update',
          form:{
            id:order._id,
            name:order.name,
            category:order.category,
            unit_price:order.unit_price,
            status:order.status
          }
        });
      }
      
      handleChange=async e=>{
      e.persist();
      await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]:e.target.value
        }
      });
      console.log(this.state.form);
      }
      
      componentDidMount(){
      this.peticionGet();
      }
      


    render(){
        const {form}=this.state;
        return(
<div>
            <br/>
            <button className="btn btn-success" onClick={()=>{this.setState({form:null,modal_type:'insert'}); this.modalSave()}}>Add Product</button>
            <br/><br/>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Unit Price</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.data.map(product=>{
                   return(
                     <tr>
                       <td>{product.name}</td>
                       <td>{product.category}</td>
                       <td>{product.unit_price}</td>
                       <td>{product.status==1?'Active':'Inactive'}</td>
                       <td><button className="btn btn-primary" onClick={()=>{this.selectOrder(product); this.modalSave()}}>Edit</button>
                       {"    "}
                       <button className="btn btn-danger" onClick={()=>{this.selectOrder(product);this.setState({modalDelete:true})}}>Delete</button>
                       </td>
                     </tr>
         
                   )
         
                 })}
              </tbody>
            </table>
         
         <Modal isOpen={this.state.modalSave}>
         <ModalHeader style={{display:'block'}}>
           <span style={{float:'right'}}>x</span>
         </ModalHeader>
         <ModalBody>
           <div className="form-group">
             <label htmlFor="name">Name</label>
             <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange}  value={form?form.name:''}/>
             <br/>
             <label htmlFor="category">Category</label>
             <input className="form-control" type="text" name="category" id="category" onChange={this.handleChange}  value={form?form.category:''}/>
             <br/>
             <label htmlFor="unit_price">Unit Price</label>
             <input className="form-control" type="text" name="unit_price" id="unit_price" onChange={this.handleChange}  value={form?form.unit_price:''}/>
             <br/>
             <label htmlFor="status">Status</label>
             <select className="form-control" name="status" id="status" onChange={this.handleChange}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>
             <br/>
           </div>
         </ModalBody>
         <ModalFooter>
           {this.state.modal_type=='insert'? 
           <button className="btn btn-success" onClick={()=>this.actionPost()}>
             Save
           </button>:
          <button className="btn btn-primary" onClick={()=>this.actionPut()}>
          Update
         </button>}
         
           <button className="btn btn-danger" onClick={()=>this.modalSave()}>Cancel</button>
         </ModalFooter>
         </Modal>
         
         <Modal isOpen={this.state.modalDelete}>
           <ModalBody>
                 Are you sure to remove this order? {form && form.name}
           </ModalBody>
           <ModalFooter>
         <button className="btn btn-danger" onClick={()=>this.actionDelete()}>Yes</button>
         <button className="btn btn-secundary" onClick={()=>this.setState({modalDelete:false})}>No</button>
           </ModalFooter>
         </Modal>

         </div>
        )
    }}