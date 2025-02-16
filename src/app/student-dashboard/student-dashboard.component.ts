import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  studentData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      Branch: [''],
      Year: [''],
      Mobile: [''],
      Email: ['']
    });
    this.getAllStudents();
  }

  clickAddStudent() {
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postStudentDetails() {
    this.studentModelobj = { ...this.formvalue.value };

    this.api.postStudent(this.studentModelobj).subscribe(res => {
      alert("Student Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formvalue.reset();
      this.getAllStudents();
    }, err => {
      alert("Something Went Wrong");
    });
  }

  getAllStudents() {
    this.api.getStudent().subscribe(res => {
      this.studentData = res;
    });
  }

  deleteStudent(row: any) {
    this.api.deleteStudent(row.id).subscribe(res => {
      alert("Student Deleted Successfully");
      this.getAllStudents();
    }, err => {
      alert("Failed to Delete Student");
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelobj = { ...row }; // Copy row data properly
    this.formvalue.patchValue(row); // Efficiently update form fields
  }

  updateStudent() {
    this.studentModelobj = { ...this.formvalue.value };

    this.api.updateStudent(this.studentModelobj, this.studentModelobj.id).subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formvalue.reset();
      this.getAllStudents();
    }, err => {
      alert("Failed to Update Student");
    });
  }
}
