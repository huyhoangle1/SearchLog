import React from 'react';
import { Button } from 'antd';
function ExportJsonButton({data}) {

  const exportDataBody = () => {
    // const bodyObjects = data.map(item => JSON.parse(item.body));
    const bodyObjects = JSON.parse(data.body);
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
    // const dataObjects = data.map(item => JSON.parse(item.data));
    const dataObjects = JSON.parse(data.data);
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
    <div style={{display: 'flex'}}>
          <Button type="primary"  style={{fontSize:11, textAlign: "center"}} onClick={exportDataBody}>Export JSON Body</Button>
          <Button type="primary" style={{marginLeft:10, fontSize:11, textAlign: "center"}} onClick={exportData}>Export JSON Data</Button>
    </div>
  )
}

export default ExportJsonButton;