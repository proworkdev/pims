import { Component, OnInit } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { UserService } from  '../../user.service';
import { Router } from '@angular/router';

import { AlertsService } from '@jaspero/ng2-alerts';


@Component({
  templateUrl: 'csvoperation.component.html'
})
export class CsvoperationComponent  implements OnInit {
  // csvoperation ColorsComponent
 
  constructor(
    private router: Router,
    public userService: UserService,
    private _alert: AlertsService
    ) { }

  stype = 'sold';
  ptype = 'product';
  productRange = 'all';


  public themeColors(): void {
    Array.from(document.querySelectorAll('.theme-color')).forEach(function(el) {
      const elem = document.getElementsByClassName(el.classList[0])[0];
      const background = getStyle('background-color', elem);

      const table = document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
          <tr>
            <td class="text-muted">HEX:</td>
            <td class="font-weight-bold">${rgbToHex(background)}</td>
          </tr>
          <tr>
            <td class="text-muted">RGB:</td>
            <td class="font-weight-bold">${background}</td>
          </tr>
        </table>
      `;

      el.parentNode.appendChild(table);
    });

  }

  public uploadCsvEbay(files: FileList,stype){
    //console.log(FileList);
    
    if(files && files.length > 0) {
       let file : File = files.item(0);
        this.userService.importCsv(file,this.stype).subscribe((data) => {
          
            let message = data.message;
            const type = 'success';
            this._alert.create(type, message);   
            this.router.navigate(['theme/csvopt']);
          },
          err => {       
            let error;
            let message;
            error = JSON.parse(err._body);
            message = error.message;
            const type = 'error';
            this._alert.create(type, message);
          }
        
       );
      }     
  }

  public uploadCsvProduct(files: FileList,stype){
    console.log(stype);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
       
        this.userService.importCsv(file,stype).subscribe((data) => {
          
            let message = data.message;
            const type = 'success';
            this._alert.create(type, message);
           // alert(data.message);
           
          },
          err => {       
            let error;
            let message;
            error = JSON.parse(err._body);
            message = error.message;
            const type = 'error';
            this._alert.create(type, message);
          }
        
       );
    }    
  }

  public ebayCsv(){
    this.stype = 'sale_history';
    this.productRange = 'all';
    this.downloadCsv(this.stype,this.productRange);
  }

  public productCsv(){

    this.stype = 'product';
    console.log(this.productRange);
    this.downloadCsv(this.stype,this.productRange);
  }
  

  public downloadCsv(stype,productRange){
        this.userService.exportCsv(this.stype,productRange).subscribe((data) => {

        this.generateCSV(data.data,new Date().getTime());
        },
        err => {       
          let error;
          let message;
          error = JSON.parse(err._body);
          message = error.message;
          const type = 'error';
          this._alert.create(type, message);
        }
        
       );
  }
  public generateCSV(csv, filename) {
    console.log(filename);
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {
        type: "text/csv;charset=utf-8",
    });
    downloadLink = document.createElement("a");
    downloadLink.download = filename+".csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    csv = [];
}
  public ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}


  ngOnInit(): void {
    this.themeColors();
  }
}
