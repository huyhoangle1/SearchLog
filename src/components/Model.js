import { Modal,Tabs, message, Button } from "antd";
import React from "react";

function ModelInfo({openModel, setOpenModel, data}) {

  const onChange = (key) => {
    console.log(key);
  };
  const handleCopyClick=(copy)=>{
    const textarea = document.createElement('textarea');
    textarea.value = copy;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.focus();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    message.success('Copy Thành công');
  }
  
    const items = [
      {
        key: '1',
        label: "Body",
        children: (
          <div>
            <Button style={{margin: 5,display: "block"}} type="primary" onClick={() => handleCopyClick(data.body)}>Copy</Button>
            <hr />
            <pre>{JSON.stringify(JSON.parse(data.body), null, 4)}</pre>
          </div>
        ),
      },
      {
        key: '2',
        label: "Data",
        children: (
          <div>
            <Button style={{margin: 5, display: "block"}} type="primary" onClick={() => handleCopyClick(data.data)}>Copy</Button>
            <hr />
            <pre>{JSON.stringify(JSON.parse(data.data), null, 4)}</pre>
          </div>
        ),
      },
    ];

    const handleOk = () => {
        setOpenModel(false);
        console.log(data);
      };
      const handleCancel = () => {
        setOpenModel(false);
      };

  return (
    <Modal width={1500} title="Xem Chi Tiết" open={openModel} onOk={handleOk} onCancel={handleCancel} centered>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" style={{ maxHeight: 500, overflowY: "auto",minHeight:500 }}  />
  </Modal>
  );
}

export default ModelInfo;
