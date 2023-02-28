import { Modal,Tabs } from "antd";
import React from "react";

function ModelInfo({openModel, setOpenModel, data}) {

  const onChange = (key) => {
    console.log(key);
  };
    const items = [
      {
        key: '1',
        label: `Tab 1`,
        children: `${data.body}`,
      },
      {
        key: '2',
        label: `Tab 2`,
        children: `${data.data}`,
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
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
  </Modal>
  );
}

export default ModelInfo;
