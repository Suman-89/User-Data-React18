import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EmployeeEditTask = () => {
  const { empeid } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userDataEdit, setUserDataEdit] = useState({
    userName: state?.dataEdit.employeename || '',
    userEmail: state?.dataEdit.email || '',
    userPhone: state?.dataEdit.phone || '',
    userGender: state?.dataEdit.gender || '',
    userStatus: state?.dataEdit.newstatus || false,
    userPerformance: state?.dataEdit.newperformance || 'average',
  });

  useEffect(() => {}, [state?.dataEdit.empeid]);

  const [warnMsg, setWarnMsg] = useState('');
  const [editError, setEditError] = useState(false);
  const [clkEdit, setClkEdit] = useState(false);

  const genderData = [
    {
      id: 1,
      value: 'male',
      label: 'Male',
    },
    {
      id: 2,
      value: 'female',
      label: 'Female',
    },
    {
      id: 3,
      value: 'others',
      label: 'Others',
    },
  ];

  const userEdit = (ev) => {
    ev.preventDefault();
    if (
      !userDataEdit.userName ||
      !userDataEdit.userEmail ||
      !userDataEdit.userPhone ||
      !userDataEdit.userGender
    ) {
      setWarnMsg('Data field is empty !');
      setEditError(true);
      setClkEdit(true);
      setTimeout(() => {
        setWarnMsg('');
        setClkEdit(false);
      }, 2000);
    } else {
      const userNewData = {
        employeename: userDataEdit.userName,
        email: userDataEdit.userEmail,
        phone: userDataEdit.userPhone,
        gender: userDataEdit.userGender,
        newstatus: userDataEdit.userStatus,
        newperformance: userDataEdit.userPerformance,
      };
      setClkEdit(false);

      axios
        .patch(
          `${process.env.REACT_APP_JSON_API}/employee/${empeid}`,
          userNewData
        )
        .then((uData) => {
          console.log('uData-->', uData);
          if (uData.status === 200) {
            setEditError(false);
            setWarnMsg('Data modified successfully.');
            setTimeout(() => {
              setWarnMsg('');
              navigate('/employeelist');
            }, 2000);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            console.log('err-->', err);
            setWarnMsg('Oh snap! You got an error!');
            setEditError(true);
            setTimeout(() => {
              setWarnMsg('');
            }, 2000);
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ margin: '0 auto 0', width: '70%' }}>
          <div className="row my-4">
            <div className="col-md-7">
              {warnMsg ? (
                <Alert variant={editError === true ? 'danger' : 'success'}>
                  {warnMsg}
                </Alert>
              ) : (
                <></>
              )}
            </div>
          </div>
          <Form onSubmit={userEdit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={userDataEdit.userName}
                  onChange={(event) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userName: event.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={userDataEdit.userEmail}
                  onChange={(event) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userEmail: event.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  value={userDataEdit.userPhone}
                  onChange={(event) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userPhone: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={userDataEdit.userGender}
                  onChange={(event) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userGender: event.target.value,
                    })
                  }
                >
                  <option value="">--Select gender--</option>
                  {genderData.map((gData, i) => (
                    <option key={gData.id} value={gData.value}>
                      {gData.label}
                    </option>
                  ))}
                </Form.Select>
                {!userDataEdit.userGender && clkEdit === true ? (
                  <span style={{ color: 'red' }}>Please select gender</span>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Row>
            <Form>
              <div className="mb-3">
                <Form.Label>Employee Performance : </Form.Label>{' '}
                <Form.Check
                  inline
                  label="Average"
                  value="average"
                  type="radio"
                  checked={
                    userDataEdit.userPerformance === 'average' ? true : false
                  }
                  onChange={(ev) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userPerformance: ev.target.value,
                    })
                  }
                />
                <Form.Check
                  inline
                  label="Impressive"
                  value="impressive"
                  type="radio"
                  checked={
                    userDataEdit.userPerformance === 'impressive' ? true : false
                  }
                  onChange={(ev) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userPerformance: ev.target.value,
                    })
                  }
                />
                <Form.Check
                  inline
                  label="Outstanding"
                  value="outstanding"
                  type="radio"
                  checked={
                    userDataEdit.userPerformance === 'outstanding'
                      ? true
                      : false
                  }
                  onChange={(ev) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userPerformance: ev.target.value,
                    })
                  }
                />
              </div>
            </Form>
            <Form>
              <div className="mb-3">
                <Form.Label>Employee Status : </Form.Label>{' '}
                <Form.Check
                  inline
                  label="Active"
                  type="checkbox"
                  checked={userDataEdit.userStatus}
                  onChange={(ev) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      userStatus: ev.target.checked,
                    })
                  }
                />
              </div>
            </Form>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}
            <Button
              variant="secondary"
              type="submit"
              onClick={() => navigate('/employeelist')}
            >
              Back to Userlist
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmployeeEditTask;
