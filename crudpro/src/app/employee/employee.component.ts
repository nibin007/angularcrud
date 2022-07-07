import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empobjmodel=new EmployeeModel();
  empall:any;
  eid:any;
  empForm=new FormGroup({
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    salary:new FormControl(''),
  })

  constructor(private api:ApiService) { }
  postEmployee(){
    
    this.empobjmodel.firstName=this.empForm.value.firstName
    this.empobjmodel.lastName=this.empForm.value.lastName
    this.empobjmodel.email=this.empForm.value.email
    this.empobjmodel.phone=this.empForm.value.phone
    this.empobjmodel.salary=this.empForm.value.salary
   


    this.api.postemp(this.empobjmodel)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added Successfully!!!");
      this.empForm.reset();
      this.getAllemp();
    },
    err=>{
      alert("Something Went Wrong!!")
    })
  }
  getAllemp(){
    this.api.getemp()
    .subscribe(res=>{
      this.empall=res;
    })
  }
  deleteEmp(r:any){
    this.api.delemp(r)
    .subscribe(res=>{
      alert("The employee deleted!!");
      this.getAllemp()
    },
    err=>{
      alert("Something Went Wrong!!")
    })
  }
  editEmp(r:any){
    this.eid=r.id
    this.empForm.controls['firstName'].setValue(r.firstName)
    this.empForm.controls['lastName'].setValue(r.lastName)
    this.empForm.controls['email'].setValue(r.email)
    this.empForm.controls['phone'].setValue(r.phone)
    this.empForm.controls['salary'].setValue(r.salary)
  }
  updateEmp(){
    this.empobjmodel.firstName=this.empForm.value.firstName
    this.empobjmodel.lastName=this.empForm.value.lastName
    this.empobjmodel.email=this.empForm.value.email
    this.empobjmodel.phone=this.empForm.value.phone
    this.empobjmodel.salary=this.empForm.value.salary

    this.api.updateemp(this.eid,this.empobjmodel).
    subscribe(res=>{
      alert("Employee Updated");
      this.getAllemp();
      this.empForm.reset();
    },
    err=>{
      alert("Some Error!!")
    })

  }

  ngOnInit(): void {
    this.getAllemp()
  }

}
