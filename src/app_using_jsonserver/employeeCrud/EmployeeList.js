import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, Dropdown, Table } from 'react-bootstrap';
import EmployeeView from './EmployeeView';
import { Link, useNavigate } from 'react-router-dom';
import SpinnerComponent from '../../components/SpinnerComponent';
import EmployeeSearch from './EmployeeSearch';
// Search

const EmployeeList = () => {
  const [employeeDatas, setEmployeeDatas] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // view modal useState
  const [viewEmployee, setViewEmployee] = useState({});
  const [showModal, setShowModal] = useState(false);
  // Search
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const getEmployees = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_JSON_API}/employee`)
      .then((res) => {
        console.log('res-->', res);
        if (res.status === 200) {
          setLoading(false);
          if (res.data.length === 0) {
            setMessage('No data found!');
          } else {
            setEmployeeDatas(res.data);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('err->', err);
        if (err.response.status === 404) {
          setMessage('Something went wrong!');
        }
      });
  };
  const viewData = (showEmpl) => {
    console.log('hi');
    setViewEmployee(showEmpl);
    setShowModal(true);
  };

  useEffect(() => {
    // componentDidMount
    getEmployees();
  }, []);

  const viewDetailPage = (empData) => {
    // console.log('viewDetailPage-->', empData);
    navigate(`/employeedetail/${empData.id}`);
  };

  const viewEmpDetail = (empRes) => {
    // console.log('viewEmpDetail-->', empRes);
    navigate(`/employee/detail/${empRes.id}`);
  };

  // Search
  const getSearch = (e) => {
    e.preventDefault();
    // to reset after search button click
    setSearchInput('');
  };

  const updateSearch = (evt) => {
    setSearchInput(evt.target.value);
  };

  const delData = (delId) => {
    // console.log('del-->',del);
    if (window.confirm('Do you want to remove data from the list ?')) {
      axios
        .delete(`${process.env.REACT_APP_JSON_API}/employee/${delId}`)
        .then((response) => {
          console.log('response-->', response);

          getEmployees();
        })
        .catch((delerr) => {
          console.log('delerr-->', delerr);
        });
    }
  };
  const editData = (empData) => {
    console.log('empData-->', empData);

    navigate(`/employee/edit/${empData.id}`, {
      state: { singleUser: empData },
    });
  };

  const editUserData = (userdata) => {
    console.log('userdata-->', userdata);

    navigate(`/employee/useredit/${userdata.id}`, {
      // state: { singleUser: userdata },
    });
  };

  return (
    <div className="container">
      {/* View Button start*/}
      <EmployeeView
        viewEmployee={viewEmployee}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      {/* View Button end*/}
      <div className="row mb-4">
        <div className="col-md-8">
          {/* Search Start */}
          <EmployeeSearch
            getSearch={getSearch}
            updateSearch={updateSearch}
            searchInput={searchInput}
          />

          {/* Search End */}
        </div>
        <div className="col-md-4">
          <Link className="btn btn-primary" to="/employee/add">
            Add Employee
          </Link>{' '}
          <Link className="btn btn-outline-success" to="/employee/addtask">
            Add New Employee
          </Link>{' '}
        </div>
      </div>

      {loading === true ? (
        <div
          style={{
            margin: 'auto 0px',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <SpinnerComponent />
        </div>
      ) : message ? (
        <h2>{message}</h2>
      ) : (
        <>
          <div className="container my-4">
            <Table striped="columns">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Employee Status</th>
                  <th>Employee Performance</th>
                  <th>Action</th>
                </tr>
              </thead>

              {employeeDatas &&
                (employeeDatas || [])
                  .filter((searchedValue) => {
                    // console.log('val-->', val);
                    if (searchInput === '') {
                      return searchedValue;
                    } else if (
                      searchedValue.employeename
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    ) {
                      return searchedValue;
                    } else if (
                      searchedValue.email
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    ) {
                      return searchedValue;
                    } else if (searchedValue.phone.includes(searchInput)) {
                      return searchedValue;
                    } else if (searchedValue.searchInput) {
                      return searchedValue;
                    }
                  })
                  ?.reverse()
                  .map((eData, index) => {
                    return (
                      <tbody key={eData.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{eData.employeename}</td>
                          <td>{eData.email}</td>
                          <td>{eData.phone}</td>
                          <td>{eData.gender}</td>
                          <td>
                            {eData.status === false ? (
                              <span style={{ color: 'red' }}>Inactive</span>
                            ) : (
                              <span style={{ color: 'green' }}>Active</span>
                            )}
                          </td>
                          <td>{eData.performance}</td>
                          <td>
                            <Dropdown as={ButtonGroup}>
                              <Button variant="info">Options</Button>

                              <Dropdown.Toggle split variant="outline-info" />

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => viewEmpDetail(eData)}
                                >
                                  View Employee
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => viewDetailPage(eData)}
                                >
                                  View Page
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => viewData(eData)}>
                                  View Modal
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => editData(eData)}>
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => editUserData(eData)}
                                >
                                  User Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => delData(eData.id)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            {/* <Button
                              variant="warning"
                              onClick={() => viewEmpDetail(eData)}
                            >
                              View Employee
                            </Button>{' '}
                            <Button
                              variant="info"
                              onClick={() => viewDetailPage(eData)}
                            >
                              View Page
                            </Button>{' '}
                            <Button
                              variant="primary"
                              onClick={() => viewData(eData)}
                            >
                              View Modal
                            </Button>{' '}
                            <Button
                              variant="secondary"
                              onClick={() => editData(eData)}
                            >
                              Edit
                            </Button>{' '}
                            <Button
                              variant="outline-secondary"
                              onClick={() => editUserData(eData)}
                            >
                              User edit
                            </Button>{' '}
                            <Button
                              variant="danger"
                              onClick={() => delData(eData.id)}
                            >
                              Delete
                            </Button> */}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
