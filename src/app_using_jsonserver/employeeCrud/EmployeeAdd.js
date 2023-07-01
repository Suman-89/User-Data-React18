import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const [employeeState, setEmployeeState] = useState({
    empName: '',
    empEmail: '',
    empPhone: '',
    empGender: '',
    activeEmp: false,
    empPerformance: 'good',
    empDetails: '',
    techSkill: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [onBtnClick, setOnBtnClick] = useState(false);

  const technology = [
    { value: 'nodejs', label: 'Nodejs' },
    { value: 'reactjs', label: 'Reactjs' },
    { value: 'python', label: 'Python' },
    { value: 'angular', label: 'Angular' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'next', label: 'Next' },
  ];

  const addEmployee = (evt) => {
    evt.preventDefault();

    if (
      !employeeState.empName ||
      !employeeState.empEmail ||
      !employeeState.empPhone ||
      !employeeState.empGender ||
      !employeeState.empDetails ||
      !employeeState.techSkill
      // !employeeState.empPerformance
    ) {
      setError(true);
      setOnBtnClick(true);
      setMessage('Please fill all the fields');
      setTimeout(() => {
        setMessage('');
        setOnBtnClick(false);
      }, 2000);
    } else {
      const formData = {
        id: Date.now(),
        employeename: employeeState.empName,
        email: employeeState.empEmail,
        phone: employeeState.empPhone,
        gender: employeeState.empGender,
        status: employeeState.activeEmp,
        performance: employeeState.empPerformance,
        empdetails: employeeState.empDetails,
        technology: employeeState.techSkill,
      };
      setOnBtnClick(false);

      axios
        .post(`${process.env.REACT_APP_JSON_API}/employee`, formData)
        .then((aData) => {
          console.log('aData->', aData);
          if (aData.status === 201) {
            setError(false);
            setMessage('Employee added success!');
            setTimeout(() => {
              setEmployeeState({
                empName: '',
                empEmail: '',
                empPhone: '',
                empGender: '',
                activeEmp: false,
                empdetails: '',
                empPerformance: 'good',
                techSkill: '',
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

  const handleSkillChange = (tech) => {
    console.log('tech->', tech);

    setEmployeeState({
      ...employeeState,
      techSkill: [...tech],
    });
  };

  console.log('employeeState.techSkill-->', employeeState.techSkill);
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
                value={employeeState.empName}
                onChange={(e) =>
                  setEmployeeState({
                    ...employeeState,
                    empName: e.target.value,
                  })
                }
              />
              {employeeState.empName === '' && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Enter employee name</span>
              ) : (
                <></>
              )}
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
              {employeeState.empEmail === '' && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Enter employee Email</span>
              ) : (
                <></>
              )}
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
              {employeeState.empPhone === '' && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Enter employee contact no.</span>
              ) : (
                <></>
              )}
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
              {!employeeState.empGender && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Select gender !</span>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  checked={employeeState.activeEmp}
                  onChange={(e) =>
                    setEmployeeState({
                      ...employeeState,
                      activeEmp: e.target.checked,
                    })
                  }
                />{' '}
                <p style={{ margin: '10px' }}>
                  {employeeState.activeEmp === false ? 'Inactive' : 'Active'}{' '}
                  Employee
                </p>
              </InputGroup>
            </Form.Group>

            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Employee Performance</Form.Label>
              <InputGroup className="mb-3">
                <span style={{ margin: '10px' }}>Good</span>{' '}
                <InputGroup.Radio
                  value="good"
                  checked={
                    employeeState.empPerformance === 'good' ? true : false
                  }
                  onChange={(e) =>
                    setEmployeeState({
                      ...employeeState,
                      empPerformance: e.target.value,
                    })
                  }
                />
                <span style={{ margin: '10px' }}>Better</span>{' '}
                <InputGroup.Radio
                  value="better"
                  checked={
                    employeeState.empPerformance === 'better' ? true : false
                  }
                  onChange={(e) =>
                    setEmployeeState({
                      ...employeeState,
                      empPerformance: e.target.value,
                    })
                  }
                />
                <span style={{ margin: '10px' }}>Best</span>{' '}
                <InputGroup.Radio
                  value="best"
                  checked={
                    employeeState.empPerformance === 'best' ? true : false
                  }
                  onChange={(e) =>
                    setEmployeeState({
                      ...employeeState,
                      empPerformance: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {/* {employeeState.empPerformance === '' && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Choose any one !</span>
              ) : (
                <></>
              )} */}
            </Form.Group>

            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Technology</Form.Label>
              <Select
                placeholder="Select technology"
                options={technology}
                isMulti
                components={animatedComponents}
                value={employeeState.techSkill}
                onChange={(option) => handleSkillChange(option)}
              />
              {!employeeState.techSkill && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Select technology</span>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Employee Details</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                value={employeeState.empDetails}
                onChange={(e) =>
                  setEmployeeState({
                    ...employeeState,
                    empDetails: e.target.value,
                  })
                }
              />
              {employeeState.empDetails === '' && onBtnClick === true ? (
                <span style={{ color: 'red' }}>Enter details!</span>
              ) : (
                <></>
              )}
            </Form.Group>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>{' '}
            </div>
            <div className="col-md-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate('/employeelist')}
              >
                Back
              </Button>{' '}
            </div>
            <div className="col-md-8">
              {message ? (
                <h2
                  className={error === true ? 'text-danger' : 'text-success'}
                  style={{ fontSize: '20px', margin: '5px' }}
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
