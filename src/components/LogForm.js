import { Table, Input, Row, Col, DatePicker, Typography, Select, Button, AutoComplete    } from "antd";
import { useEffect, useState } from "react";
import logApi from "../api/logApi";
import ExportCSV from "./exportcsv";
import BtnExportJson from "./btnExportJson";
import ModelInfo from "./Model";
import moment from "moment";
const { RangePicker } = DatePicker;

const LogForm = () => {
  const [dataLog, setDataLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState([]);
  const [idCourse, setIdCourse] = useState(''); // id khóa học (body)
  const [courseCode, setCourseCode] = useState(''); // mã khóa học
  const [nameCourse, setNameCourse] = useState(''); // tên khóa học
  const [userName, setUserName] = useState(''); // user name
  const [data, setData] = useState([]);
  const [path, setPath] = useState(''); // path
  const [openModel, setOpenModel] = useState(false);
  const [domain, setDomain] = useState(''); // domain
  const [status, setStatus] = useState(''); // trạng thái
  const [pageSize, setPageSize] = useState(10); // Số lượng dòng trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [total, setTotal] = useState('');
  const [value, setValue] = useState('');


  const getLog = async () => {
    const { RangePicker } = DatePicker;
    setLoading(true);
    const dataLog = await logApi.getLog(idCourse, courseCode, nameCourse, userName, path, domain, status, fromDate, toDate, currentPage, pageSize);
    setTotal(dataLog.totalCount)
    setData(dataLog.logs)
    setDataLog(dataLog.logs);
    setExportData(dataLog.logs);
    setLoading(false);
  };


  const options = [
    {
      value: '/AppService/api/v2/assessment/submitd',
    },
    {
      value: '/AppService/api/v2/assessment/submitf',
    },
    {
      value: '/AppService/api/v2/assessment/submitmcq',
    },
    {
      value: '/AppService/api/v2/assessment/submitos',
    },
    {
      value: '/AppService/api/v2/assessment/submitmf',
    },
    {
      value: '/AppService/api/v2/assessment/submittf',
    },
    {
      value: '/AppService/api/v2/assessment/submitmrq',
    },
  ];

  const optionsDomain =[  {
    value: 'http://10.0.0.120:3001',
  },
  {
    value: 'http://10.0.0.120:7000',
  },
  {
    value: 'http://10.0.0.121:3001',
  }]

  const handleOpen = (item) => {
    setOpenModel(true);
    setExportData(item)
  }

  const selectCourseCode = (e) => setCourseCode(e.target.value);

  const selectIdCourse = (e) => setIdCourse(e.target.value);

  const selectNameCourse = (e) => setNameCourse(e.target.value);

  const selectUserName = (e) => setUserName(e.target.value);

  const selectPath = (e) => setPath(e);

  const onChange = (value) => {
    if(!value) {
      setValue(value);
      setFromDate(null);
      setToDate(null)
    }else{
      setValue(value)
      setFromDate(value[0]);
      setToDate(value[1]);

    }
  };

  useEffect(() => {
    getLog();
  }, [currentPage])

  const handleChange = (value) => {
    setDomain(value);
  };
  const handleChangeStatus = (value) => {
    setStatus(value);
  };


  const handleSelectInput = async () => {
    const dataLog = await logApi.getLog(idCourse, courseCode, nameCourse, userName, path, domain, status, fromDate, toDate, currentPage, pageSize);
    setData(dataLog.logs);
    setTotal(dataLog.totalCount)
  }

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
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
      width: 150
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
        {
          text: 'http://10.0.0.121:3001',
          value: 'http://10.0.0.121:3001',
        },
      ],
      onFilter: (value, record) => record.domain.indexOf(value) === 0,
    },
    {
      title: "path",
      dataIndex: "path",
      key: "path",
      render: (text) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
      width: 300,
    },
    {
      title: "data",
      dataIndex: "data",
      key: "data",
      render: (text) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Đã Hoàn Thành",
          value: 200
        },
        {
          text: "Lỗi",
          value: 500
        }, {
          text: "Request Body",
          value: 0
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
        <div style={{ display: "flex" }}>
          <Button style={{ marginRight: 15, width: 100, fontSize:11, textAlign: "center" }} type="primary" onClick={() => handleOpen(record)}>
            Xem Chi Tiết
          </Button>
          <BtnExportJson data={record} />
        </div>
      ),
    },
  ];


  return (
    <>
      <Row>
        <Col span={24}>
          <div>
            <h1>EPS LMS LOG SYSTEM</h1>
          </div>
          {
            openModel ? <ModelInfo openModel={openModel} data={exportData} setOpenModel={setOpenModel} /> : <div></div>
          }
          <Row>
            <Col span={5} offset={2}>
              <Col span={7}>
                <h5>Id Khóa Học: </h5>
              </Col>
              <Col>
                <Input style={{ width: 320 }} onChange={selectIdCourse} placeholder="Tìm Kiếm Id Khóa Học" />
              </Col>
            </Col>
            <Col span={5} offset={2}>
              <Col span={7}>
                <h5>Mã Khóa Học: </h5>
              </Col>
              <Col>
                <Input style={{ width: 320 }} onChange={selectCourseCode} placeholder="Tìm Kiếm Theo Mã Khóa Học" />
              </Col>

            </Col>
            <Col span={5} offset={2}>
              <Col span={4}>
                <h5>Domain: </h5>
              </Col>
              <Col>
               <AutoComplete
                  options={optionsDomain}
                  style={{
                    width: 320,
                  }}
                  onChange={handleChange}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                  allowClear={true}
                  placeholder="Tìm Kiếm Theo Path"
                />
              </Col>

            </Col>
          </Row>
          <Row>
            <Col span={5} offset={2}>
              <Col span={7}>
                <h5>Tên Khóa Học: </h5>
              </Col>
              <Col>
                <Input style={{ width: 320 }} onChange={selectNameCourse} placeholder="Tìm Kiếm Theo Tên Khóa Học" />
              </Col>

            </Col>
            <Col span={5} offset={2}>
              <Col span={7}>
                <h5>UseName: </h5>
              </Col>
              <Col>
                <Input style={{ width: 320 }} onChange={selectUserName} placeholder="Tìm Kiếm Theo UseName" />
              </Col>

            </Col>
            <Col span={5} offset={2}>
              <Col span={3}>
                <h5>Loại: </h5>
              </Col>
              <Col>
              <Select
                defaultValue=""
                style={{
                  width: 320,
                }}
                onChange={handleChangeStatus}
                allowClear={true}
                options={[
                  {
                    value: '200',
                    label: 'Đã Hoàn Thành',
                  },
                  {
                    value: '500',
                    label: 'Bị Lỗi',
                  },
                  {
                    value: '0',
                    label: 'Trước Khi Gửi Request',
                  }
                ]}
              />
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={5} offset={2} >
              <Col span={4}>
                <h5>Path: </h5>
              </Col>
              <Col>
                {/* <Input onChange={selectPath} placeholder="Tìm Kiếm Theo Path" /> */}
                <AutoComplete
                  options={options}
                  style={{
                    width: 320,
                  }}
                  onChange={selectPath}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                  allowClear={true}
                  placeholder="Tìm Kiếm Theo Path"
                />
              </Col>
            </Col>
            <Col span={5} offset={2}>
              <Row>
                <Col span={5}>
                  <h5>Ngày tạo</h5></Col>
                <Col>
                  <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    onChange={onChange}
                    value={value}
                    allowClear={true}
                  />
                </Col>
              </Row>

            </Col>
          </Row>
          <Button type='primary' style={{ margin: 20 }} onClick={handleSelectInput}>Tìm Kiếm</Button>
          <Table
            rowKey={(record, index) => index}
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              onChange: (page) => setCurrentPage(page),
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              showSizeChanger: false
            }}
          />

        </Col>
      </Row>
    </>
  );
};

export default LogForm;