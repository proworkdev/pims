import { Component, OnInit } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

import { AlertsService } from '@jaspero/ng2-alerts';


@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
 
  constructor(
    private router: Router,
    public userService: UserService,
    private _alert: AlertsService
    ) { }

  


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

  public uploadCsv(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
        this.userService.importCsv(file,file).subscribe((data) => {
          
            let message = data.message;
            const type = 'success';
            this._alert.create(type, message);
           
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

  public downloadCsv(type){

        /* this.userService.exportCsv(type).subscribe((data) => {
        
        this.downloadCSV1(data.data,"filename");
        
         
           
          },
          err => {       
            // let error;
            // let message;
            // error = JSON.parse(err._body);
            // message = error.message;
            // const type = 'error';
            // this._alert.create(type, message);
          }
        
        );  */ 
        console.log(type);       
  }

  public downloadCSV1(csv, filename) {
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
