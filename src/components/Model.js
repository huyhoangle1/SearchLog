import { Modal,Tabs, message, Button } from "antd";
import React from "react";

function ModelInfo({openModel, setOpenModel, data}) {

  const onChange = (key) => {
    console.log(key);
  };
  const handleCopyClick= (copy)=>{
    navigator.clipboard.writeText(copy);
    message.success("Copy Thành công");
  }
    const items = [
      {
        key: '1',
        label: `Tab 1`,
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
        label: `Tab 2`,
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
    <Modal width={1500} title="Info Model" open={openModel} onOk={handleOk} onCancel={handleCancel}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" style={{ maxHeight: 500, overflowY: "auto" }}  />
  </Modal>
  );
}

export default ModelInfo;
