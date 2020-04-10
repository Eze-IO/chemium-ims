import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { user } from '../../models/user';
import { ExtensionService } from '../../helpers/extension.service';
import { FileUploadModule } from 'primeng/fileupload';
import { RestAPIService } from "../../services/rest-api.service";
import { timer } from 'rxjs';
import { Type } from '../../models/type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  mainForm : FormGroup;
  _status: string = null;
  get status(): string {
    return this._status;
  }
  _success: boolean = false;
  get success(): boolean {
    return this._success;
  }
  selectedFile: File;
  dataUrl: string = null;

  private u:user = new user();
  picture_content:SafeHtml;
  constructor(private cu: CurrentUserService, private formBuilder: FormBuilder, private ras: RestAPIService) { }

  ngOnInit(): void {
    this.u = this.cu.GetInfo;
    this.toggleLoadingProfile();
    this.mainForm = this.formBuilder.group({
       first_name: ['', Validators.required],
       last_name: ['', Validators.required],
       email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
       phone_number: ['', Validators.required, Validators.pattern("[/^(1|)?(\d{3})(\d{3})(\d{4})$/]{11}")],
       role: ['']
     });
    this.fillValues();
  }

  getRoleName(_type: Type){
    switch(_type){
      case 4:
        return "Administrator";
      case 2:
        return "Editor";
      default:
        return "Viewer";
    }
  }


  fillValues(){
    this.mainForm.patchValue({
      first_name: this.cu.FirstName,
      last_name: this.cu.LastName,
      email: this.u.email,
      phone_number: this.u.phone_number,
      role: this.getRoleName(this.u.type)
    });
  }

  async toggleLoadingProfile(){
    let loader = "<div class='d-flex justify-content-center animated fadeIn' style='margin:auto;'>"
    +"<div class='spinner-border m-5' style='width: 12rem; height: 12rem;' role='status'>"
    +"<span class='sr-only'>Loading...</span></div></div>";
    let picture = "<img src='[IMAGE]' class='bd-placeholder-img card-img animated fadeIn' alt='[EMAIL]' style='border-radius:5px;'/>";
    if(ExtensionService.IsEmptyOrNull(this.u.picture)||this.u.picture===undefined)
      this.u.picture = "../../../../assets/img/avatars/default.png";
    picture = picture.replace("[IMAGE]", this.u.picture).replace('[EMAIL]', this.u.email);
    if(this.picture_content===picture){
      this.picture_content = loader;
    } else {
      this.picture_content = picture;
    }
  }

  getNumber(e) {
    if(!ExtensionService.IsEmptyOrNull(e))
      this.u.phone_number = e;
    else
      this.u.phone_number = null;
  }

  pnError:boolean = false;
  hasError(e) {
    this.pnError = !e;
  }

  onCountryChange(e) {
    console.log(e);
  }

  onPHTextChange(e){
      var match = e.target.value.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        e.target.value=[intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      }
  }

  onTextChange(e) {
    if(!ExtensionService.IsEmptyOrNull(this.mainForm.controls.email.value))
      this.u.email = this.mainForm.controls.email.value;
    let name = (this.mainForm.controls.first_name.value+" "+this.mainForm.controls.last_name.value);
    if(!ExtensionService.IsEmptyOrNull(name))
      this.u.name = name;
  }

  async onFileSelected(e) {
    let _file = this.selectedFile = <File>e.target.files[0];
    var reader = new FileReader();
    let promise = new Promise<string>(function (resolve, reject) {
      reader.onloadend = () => resolve(reader.result.toString());
      reader.onerror = reject;
      if (_file!== null || typeof(_file)!== undefined)
        reader.readAsDataURL(_file);
    });
    if (this.selectedFile!==null)
      this.dataUrl = await promise;
  }

  onUpload() {
    this.toggleLoadingProfile();
    if (this.dataUrl !== null) {
      let x = this.cu.UploadPicture(this.dataUrl);
        if (x) {
          this._success = true;
          this._status = "Successfully updated profile picture";
        } else {
          this._success = false;
          this._status = "Failed to update profile picture";
        }
    }
    timer(3000).subscribe((val) => {
      this.toggleLoadingProfile();
    });
  }

  onSubmit() {
    if(!this.mainForm.invalid){
      this.cu.UpdateInfo(this.u).then(x => {
        if(x){
          this._success = true;
          this._status = "Successfully updated information";
        } else {
          this._success = false;
          this._status = "Falied to update information";
        }
        this.fillValues();
      });
    } else {
      const invalid = [];
      this._success = false;
      this._status = "These fields are not valid: ";
      const controls = this.mainForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name.replace("_", " "));
          }
      }
      this._status += invalid.join(", ");
    }
    this.fillValues();
  }
}
