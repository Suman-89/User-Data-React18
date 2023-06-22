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
    userStatus: state?.dataEdit.status || false,
    userPerformance: state?.dataEdit.performance || 'good',
  });

  useEffect(() => {}, [state?.dataEdit.empeid]);

  const [warnMsg, setWarnMsg] = useState('');
  const [editError, setEditError] = useState(false);
  const [clkEdit, setClkEdit] = useState(false);

  const userEdit = (ev) => {
    ev.preventDefault();
    if (
      !userDataEdit.userName ||
      !userDataEdit.userEmail ||
      !userDataEdit.userPhone
    ) {
      setWarnMsg('Data can not be emptied.');
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
                <Form.Select aria-label="Open this select menu">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </Row>
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
