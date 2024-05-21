import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


export const exportToExcel = (data: any, fileName: string) : void => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
    const blobData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(blobData, fileName + fileExtension);
}