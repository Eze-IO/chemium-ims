import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtensionService } from '../../helpers/extension.service';
import { RestAPIService } from '../../services/rest-api.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmComponent implements OnInit {
  loading:number = 0;
  title:string = "Enter Your Email";
  confirmInput:string = "none";
  emailInput:string = "";
  mainForm : FormGroup;
  status:string = null;
  email:string;

  @ViewChild("contain") inputFields: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private ras: RestAPIService) { }

  ngOnInit(): void {
    this.toggleLoadingScreen();
    this.mainForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      i1: ['', Validators.required],
      i2: ['', Validators.required],
      i3: ['', Validators.required],
      i4: ['', Validators.required],
      i5: ['', Validators.required],
      i6: ['', Validators.required]
    });
    this.toggleLoadingScreen();
  }

  toggleLoadingScreen(){
    if(this.loading===0){
      this.loading = 2;
    } else {
      this.loading = 0;
    }
  }

  onTextChange() {
    this.email = this.mainForm.controls.email.value;
    if(!ExtensionService.IsEmptyOrNull(this.email)){
        this.confirmInput = "flex";
        this.title = "Enter Your Confirmation Code";
    } else {
      this.confirmInput = "none";
      this.title = "Enter Your Email";
    }
  }

  private enabled:boolean = true;
  toggleDisable(){
    if(!this.mainForm.controls['email'].enabled){
      this.mainForm.controls['email'].enable();
      this.mainForm.controls['i1'].enable();
      this.mainForm.controls['i2'].enable();
      this.mainForm.controls['i3'].enable();
      this.mainForm.controls['i4'].enable();
      this.mainForm.controls['i5'].enable();
      this.mainForm.controls['i6'].enable();
    } else {
      this.mainForm.controls['email'].disable();
      this.mainForm.controls['i1'].disable();
      this.mainForm.controls['i2'].disable();
      this.mainForm.controls['i3'].disable();
      this.mainForm.controls['i4'].disable();
      this.mainForm.controls['i5'].disable();
      this.mainForm.controls['i6'].disable();
    }
  }

  keytab(event, max){
    var target = event.target || event.srcElement;
    let id = target.id;
    let elements = this.inputFields.nativeElement.getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++) {
      let element = elements[i];
      if(element!==null){
        if(id===element.id){
           let nextID = "i"+(i+2);
           if(elements[nextID])
              if(ExtensionService.IsEmptyOrNull(elements[nextID].value)&&
              !ExtensionService.IsEmptyOrNull(event.target.value))
                  elements[nextID].focus();
        }
      }
    }
  }

  onInputChange() {
    let i1 = this.mainForm.controls.i1.value;
    let i2 = this.mainForm.controls.i2.value;
    let i3 = this.mainForm.controls.i3.value;
    let i4 = this.mainForm.controls.i4.value;
    let i5 = this.mainForm.controls.i5.value;
    let i6 = this.mainForm.controls.i6.value;
    var count = (i1.length+i2.length+i3.length+i4.length+i5.length+i6.length);
    if(count===6){
        this.title = "Loading....";
        this.toggleDisable();
        let code = (i1+i2+i3+i4+i5+i6).trim();
        this.ras.ConfirmUser(this.email, code).then(x => {
          this.toggleLoadingScreen();
          if(x){
            this.title = "Confirmation Successful!";
            this.confirmInput = "none";
            this.emailInput = "none";
          } else {
            this.title = null;
            this.status = "Confirmation Failed: please check that your not already confirmed & your code/email is correct";
          }
          this.toggleLoadingScreen();
        });
    }
  }

}
