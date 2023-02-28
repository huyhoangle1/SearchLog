import React from 'react';
import { Button } from 'antd';
function ExportJsonButton({data}) {

  const exportDataBody = () => {
    const bodyObjects = data.map(item => JSON.parse(item.body));
    console.log(bodyObjects);
    const jsonData = JSON.stringify(bodyObjects);
    const fileBlob = new Blob([jsonData], { type: 'application/json' });
    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'data.json';
    downloadLink.click();
  };
  const exportData = () => {
    const dataObjects = data.map(item => JSON.parse(item.data));
    console.log(dataObjects);
    const jsonData = JSON.stringify(dataObjects);
    const fileBlob = new Blob([jsonData], { type: 'application/json' });
    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'data.json';
    downloadLink.click();
  };

  return (
    <div>
          <Button type="primary"  onClick={exportDataBody}>Xuất dữ liệu JSON Body</Button>
          <Button type="primary" style={{marginLeft:10}} onClick={exportData}>Xuất dữ liệu JSON Data</Button>
    </div>
  )
}

export default ExportJsonButton;