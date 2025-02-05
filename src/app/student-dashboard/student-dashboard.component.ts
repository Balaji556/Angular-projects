import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { Studentdashboard } from '../studentdashboard';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  formvalue!: FormGroup;
  studentModelobj: Studentdashboard = new Studentdashboard();
  studentData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      id:[''],
      firstName: [''],
      lastName: [''],
      Branch: [''],
      Year: [''],
      Mobile: [''],
      Email: ['']

    })
    this.getAllStudents();
  }
  clickAddStudent() {
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postStudentDetails() {
    this.studentModelobj.id = this.formvalue.value.id;
    this.studentModelobj.firstName = this.formvalue.value.firstName;
    this.studentModelobj.lastName = this.formvalue.value.lastName;
    this.studentModelobj.Branch = this.formvalue.value.Branch;
    this.studentModelobj.Year = this.formvalue.value.Year;
    this.studentModelobj.Mobile = this.formvalue.value.Mobile;
    this.studentModelobj.Email = this.formvalue.value.Email;

    this.api.postStudent(this.studentModelobj).subscribe(res => {
      console.log(res);
      alert("Student Added Succesfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this.getAllStudents();
    },
    err => {
      alert("Something Went Wrong");
    })

  }
  getAllStudents() {
    this.api.getStudent().subscribe(res => {
      this.studentData = res;
    })
  }
  deleteStudent(row:any){
this.api.deleteStudent(row.id).subscribe(res=>{
  alert("Student Deleted");
  this.getAllStudents();
})
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelobj.id = row.id;
    this.formvalue.controls['id'].setValue(row.id);
    this.formvalue.controls['firstName'].setValue(row.firstName);
    this.formvalue.controls['lastName'].setValue(row.lastName);
    this.formvalue.controls['Branch'].setValue(row.Branch);
    this.formvalue.controls['Year'].setValue(row.Year);
    this.formvalue.controls['Mobile'].setValue(row.Mobile);
    this.formvalue.controls['Email'].setValue(row.Email);
  }

  updateStudent() {
    this.studentModelobj.id = this.formvalue.value.id;
    this.studentModelobj.firstName = this.formvalue.value.firstName;
    this.studentModelobj.lastName = this.formvalue.value.lastName;
    this.studentModelobj.Branch = this.formvalue.value.Branch;
    this.studentModelobj.Year = this.formvalue.value.Year;
    this.studentModelobj.Mobile = this.formvalue.value.Mobile;
    this.studentModelobj.Email = this.formvalue.value.Email;

    this.api.updateStudent(this.studentModelobj, this.studentModelobj.id)
      .subscribe(res => {
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.getAllStudents();
      })
  }
}
