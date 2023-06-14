import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [employeeState, setEmployeeState] = useState({
    empName: '',
    empEmail: '',
    empPhone: '',
    empGender: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const addEmployee = (evt) => {
    evt.preventDefault();

    if (
      !employeeState.empName ||
      !employeeState.empEmail ||
      !employeeState.empPhone ||
      !employeeState.empGender
    ) {
      setError(true);
      setMessage('Please fill all the fields');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else {
      const formData = {
        id: Date.now(),
        employeename: employeeState.empName,
        email: employeeState.empEmail,
        phone: employeeState.empPhone,
        gender: employeeState.empGender,
      };

      axios
        .post(`${process.env.REACT_APP_JSON_API}/employee`, formData)
        .then((aData) => {
          console.log('aData->', aData);
          if (aData.status === 201) {
            setError(false);
            setMessage('Employee added success!');
            setTimeout(() => {
              setEmployeeState({
                ...employeeState,
                empName: '',
                empEmail: '',
                empPhone: '',
                empGender: '',
              });
              setMessage('');
              navigate('/employeelist');
            }, 1000);
          }
        })
        .catch((err) => {
          console.log('add_err=>', err);
          if (err.response.status === 404) {
            setError(true);
            setMessage('Employee addition failed!');
            setTimeout(() => {
              setMessage('');
            }, 2000);
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ width: '60%', margin: '0 auto' }}>
        <Form onSubmit={addEmployee}>
          <div className="mb-4">
            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="employeename"
                id="employeename"
                placeholder="Employee name"
                // defaultValue={employeeState.empName}
                value={employeeState.empName}
                onChange={(e) =>
                  setEmployeeState({
                    ...employeeState,
                    empName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="useremail"
                  id="useremail"
                  value={employeeState.empEmail}
                  onChange={(e) =>
                    setEmployeeState({
                      ...employeeState,
                      empEmail: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                value={employeeState.empPhone}
                onChange={(e) =>
                  setEmployeeState({
                    ...employeeState,
                    empPhone: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={employeeState.empGender}
                onChange={(e) =>
                  setEmployeeState({
                    ...employeeState,
                    empGender: e.target.value,
                  })
                }
              >
                <option value="">-- Select One --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>{' '}
            </div>
            <div className="col-md-8">
              {message ? (
                <h2
                  className={error === true ? 'text-danger' : 'text-success'}
                  style={{ fontSize: '20px' }}
                >
                  {message}
                </h2>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeAdd;
