import { Table, Input, Row, Col, DatePicker, Typography } from "antd";
import { useEffect, useState } from "react";
import logApi from "../api/logApi";
import ExportCSV from "./exportcsv";
import BtnExportJson from "./btnExportJson";
import { Button } from "antd/es/radio";
import ModelInfo from "./Model";
import moment from "moment";
const { RangePicker } = DatePicker;

const LogForm = () => {
  const [dataLog, setDataLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState([]);
  const [idCourse, setIdCourse] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [nameCourse, setNameCourse] = useState('');
  const [userName, setUserName] = useState('');
  const [data, setData] = useState([]);
  const [path, setPath] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const [searchTime, setSearchTime] = useState(null);

  const getLog = async () => {
    const { RangePicker } = DatePicker;
    setLoading(true);
    const dataLog = await logApi.getLog();
    setData(dataLog)
    setDataLog(dataLog);
    setExportData(dataLog);
    setLoading(false);
  };


  const handleOpen = (item) =>{
    console.log(item);
    setOpenModel(true);
    setExportData(item)
  } 

  const selectCourseCode = (e) => setCourseCode(e.target.value);

  const selectIdCourse = (e) => setIdCourse(e.target.value);

  const selectNameCourse = (e) => setNameCourse(e.target.value);

  const selectUserName = (e) => setUserName(e.target.value);

  const selectPath =(e) => setPath(e.target.value)

  const onChange = (value, dateString) => {
    console.log(dateString,'va');
    setSearchTime(dateString);
  };
  const onOk = () => {
    if(searchTime) {
      if(searchTime.length==2) {
        const log = dataLog.filter(item => {
          return (
              moment(item.created_at).unix() >= moment(searchTime[0]).unix() &&
              moment(item.created_at).unix() <= moment(searchTime[1]).unix()
            );
          })
          console.log(log,'log');
        setData(log);
      }
      else{
        const log = dataLog.filter(item => {
          return (
            new Date(moment(item.created_at).unix()*1000).toLocaleDateString("en-US")
            == new Date(moment(searchTime).unix()*1000).toLocaleDateString("en-US")
            );
          })
        setData(log);
      }
    }else{
      setData(dataLog);
    }
  };

  const handleSearchId = () => {
    const a = idCourse?.toLowerCase();;
    const e = dataLog.filter((item) => {
      return item?.id?.toLowerCase().includes(a)
    });
    setData(e);
  }

  const handlePath = () => {
    const a = path?.toLowerCase();;
    const e = dataLog.filter((item) => {
      return item?.path?.toLowerCase().includes(a)
    });
    setData(e);
  }

  const handleSearchNameCourse = () => {
    const a = nameCourse?.toLowerCase();
    const e = dataLog.filter((item) => {
      return item?.user_name?.toLowerCase().includes(a)
    });
    setData(e);
  }
  const handleUserName = () => {
    const a = userName?.toLowerCase();
    const e = dataLog.filter((item) => {
        return item?.user_name?.toLowerCase().includes(a)
    });
    setData(e);
  }
  const handleSearchCourseCode = () => {
    const a = courseCode?.toLowerCase();
    const e = dataLog.filter((item) => {
      return item?.course_id?.toLowerCase().includes(a)
    });
    setData(e);
  }
  
  useEffect(() => {
    getLog();
  }, [searchTime]);
  const columns = [
    {
      title: "id",
      id: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    // {
    //   title: "Course Id",
    //   dataIndex: "course_id",
    //   key: "course_id",
    // },
    // {
    //   title: "course title",
    //   dataIndex: "course_title",
    //   key: "course_title",
    // },
    // {
    //   title: "question_id",
    //   dataIndex: "question_id",
    //   key: "question_id",
    // },
    // {
    //   title: "question_title",
    //   dataIndex: "question_title",
    //   key: "question_title",
    // },
    {
      title: "body",
      dataIndex: "body",
      key: "body",
      width: 300,
      render: (text) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => {
        return (
          <>{moment(`${record.created_at}`).format("YYYY-MM-DD kk:mm:ss")}</>
        );
      },
      width:150
    },
    {
      title: "domain",
      dataIndex: "domain",
      key: "domain",
      filters: [
        {
          text: 'http://10.0.0.120:3001',
          value: 'http://10.0.0.120:3001',
        },
        {
          text: 'http://10.0.0.120:7000',
          value: 'http://10.0.0.120:7000',
        },
      ],
      onFilter: (value, record) => record.domain.indexOf(value) === 0,
    },
    {
      title: "path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "data",
      dataIndex: "data",
      key: "data",
      render: (text) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
      width:300,
    },
    {
      title:"Status",
      dataIndex: "status",
      key: "status",
      filters:[
        {
          text: "Đã Hoàn Thành",
          value:200
        },
        {
          text: "Lỗi",
          value:500
        },{
          text: "Request Body",
          value:0
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={()=>handleOpen(record)}>
              Info
          </Button>
        </div>
       ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
        <div>
          <h1>Table Log</h1>
        </div>
          {
            openModel ? <ModelInfo openModel={openModel} data={exportData} setOpenModel={setOpenModel} /> : <div></div>
          }
        <Row style={{marginTop:10}}>
          <Col span={8} offset={2}>
             <Input onChange={selectIdCourse} placeholder="Tìm Kiếm Id Khóa Học" />
             <Button style={{marginTop:5}} onClick={handleSearchId}>Tìm Kiếm</Button>
          </Col>
          <Col span={8} offset={2}>
            <Input onChange={selectCourseCode} placeholder="Tìm Kiếm Theo Mã Khóa Học" />
            <Button style={{marginTop:5}}  onClick={handleSearchCourseCode}>Tìm Kiếm</Button>
          </Col>
          </Row>
          <Row style={{marginTop:10}}>
          <Col span={8} offset={2}>
            <Input onChange={selectNameCourse} placeholder="Tìm Kiếm Theo Tên Khóa Học" />
            <Button style={{marginTop:5}}  onClick={handleSearchNameCourse}>Tìm Kiếm</Button>
          </Col>
         <Col span={8} offset={2}>
         <Input onChange={selectUserName} placeholder="Tìm Kiếm Theo UseName" />
          <Button style={{marginTop:5}}  onClick={handleUserName}>Tìm Kiếm</Button>
         </Col>
          </Row>
          <Row style={{marginTop:10, marginBottom:10}}>
          <Col span={8} offset={2} >
          <Input onChange={selectPath} placeholder="Tìm Kiếm Theo Path" />
          <Button style={{marginTop:5}} onClick={handlePath}>Tìm Kiếm</Button>
          </Col>
          <Col style={{padding:5}} span={8} offset={2}>
            {/* <ExportCSV data={exportData} filename={"my-data.csv"}  /> */}
            <BtnExportJson data={data} />
            {/* <BtnExportJson data={exportData} /> */}
          </Col>
          </Row>
          <Col span={8} offset={8} style={{marginBottom: 10}}>
          <RangePicker
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
              defaultValue=''
            />
            <Button style={{marginTop:5}} onClick={onOk}>Tìm Kiếm</Button>
          </Col>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={{
            ...data.pagination,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
 
        </Col>
      </Row>
    </>
  );
};

export default LogForm;