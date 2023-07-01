import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EmployeeEdit = () => {
  const { empeid } = useParams();
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  // console.log('empeid->', empeid);

  const { state } = useLocation();

  const [employeeEditState, setEmployeeEditState] = useState({
    empName: state?.singleUser.employeename || '',
    empEmail: state?.singleUser.email || '',
    empPhone: state?.singleUser.phone || '',
    empGender: state?.singleUser.gender || '',
    empActive: state?.singleUser.status || false,
    empPerformance: state?.singleUser.performance || 'good',
    empTechSkill: state?.singleUser.technology || [],
  });
  const [showMessage, setShowMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [btnClick, setBtnClick] = useState(false);
  const [onCheck, setOnCheck] = useState(false);

  useEffect(() => {}, [state?.singleUser, empeid]);

  const technology = [
    { value: 'nodejs', label: 'Nodejs' },
    { value: 'reactjs', label: 'Reactjs' },
    { value: 'python', label: 'Python' },
    { value: 'angular', label: 'Angular' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'next', label: 'Next' },
  ];

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

  const handleSkillChange = (eTech) => {
    console.log('eTech->', eTech);
    setEmployeeEditState({
      ...employeeEditState,
      empTechSkill: [...eTech],
    });
  };

  const editEmployee = (e) => {
    e.preventDefault();
    if (
      !employeeEditState.empName ||
      !employeeEditState.empEmail ||
      !employeeEditState.empPhone ||
      !employeeEditState.empGender ||
      !employeeEditState.empTechSkill ||
      onCheck === false
    ) {
      setShowError(true);
      setBtnClick(true);
      setOnCheck(false);
      setShowMessage('Please fill all the fields');
      setTimeout(() => {
        setShowMessage('');
        setBtnClick(true);
      }, 2000);
    } else {
      const formData = {
        employeename: employeeEditState.empName,
        email: employeeEditState.empEmail,
        phone: employeeEditState.empPhone,
        gender: employeeEditState.empGender,
        status: employeeEditState.empActive,
        performance: employeeEditState.empPerformance,
        technology: employeeEditState.empTechSkill,
      };
      setBtnClick(false);
      setOnCheck(true);
      axios
        .put(`${process.env.REACT_APP_JSON_API}/employee/${empeid}`, formData)
        .then((eData) => {
          console.log('edit->', eData);
          if (eData.status === 200) {
            setShowError(false);
            setShowMessage('Edited successfully.');
            setTimeout(() => {
              setShowMessage('');
              navigate('/employeelist');
            }, 2000);
          }
        })
        .catch((errEdit) => {
          if (errEdit.response.status === 404) {
            setShowError(true);
            setShowMessage('Something went wrong !');
            console.log('errEdit->', errEdit);
            setTimeout(() => {
              setShowMessage('');
            }, 2000);
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ width: '60%', margin: '0 auto' }}>
        <Form onSubmit={editEmployee}>
          <div className="mb-4">
            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="employeename"
                id="employeename"
                placeholder="Employee name"
                value={employeeEditState.empName}
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empName: e.target.value,
                  })
                }
              />
              {!employeeEditState.empName && btnClick === true ? (
                <span style={{ color: 'red' }}>Name field is empty !</span>
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
                  value={employeeEditState.empEmail}
                  onChange={(e) =>
                    setEmployeeEditState({
                      ...employeeEditState,
                      empEmail: e.target.value,
                    })
                  }
                />
              </InputGroup>
              {!employeeEditState.empEmail && btnClick === true ? (
                <span style={{ color: 'red' }}>Email field is empty !</span>
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
                value={employeeEditState.empPhone}
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empPhone: e.target.value,
                  })
                }
              />
              {!employeeEditState.empPhone && btnClick === true ? (
                <span style={{ color: 'red' }}>Contact field is empty !</span>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group md="4" style={{ marginBottom: '20px' }}>
              <Form.Label>Gender</Form.Label>

              <Form.Select
                id="gender"
                name="gender"
                value={employeeEditState.empGender}
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empGender: e.target.value,
                  })
                }
              >
                <option value="">--Select option--</option>
                {genderData.map((gData, i) => (
                  <option key={gData.id} value={gData.value}>
                    {gData.label}
                  </option>
                ))}
              </Form.Select>
              {!employeeEditState.empGender && btnClick === true ? (
                <span style={{ color: 'red' }}>Please select gender</span>
              ) : (
                <></>
              )}
            </Form.Group>
          </div>

          <Form.Group md="4" style={{ marginBottom: '20px' }}>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox
                checked={employeeEditState.empActive}
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empActive: e.target.checked,
                  })
                }
              />{' '}
              <p style={{ margin: '10px' }}>Active Employee</p>
            </InputGroup>
          </Form.Group>

          <div className="container mb-3">
            <Form.Check
              label="Agree to continue edit"
              onChange={(ev) => setOnCheck(ev.target.checked)}
            />
            {onCheck === false && btnClick === true ? (
              <span style={{ color: 'red' }}>Data is not checked</span>
            ) : (
              <></>
            )}
          </div>

          <Form.Group md="4" style={{ marginBottom: '20px' }}>
            <Form.Label>Employee Performance</Form.Label>
            <InputGroup className="mb-3">
              <span style={{ margin: '10px' }}>Good</span>{' '}
              <InputGroup.Radio
                value="good"
                checked={
                  employeeEditState.empPerformance === 'good' ? true : false
                }
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empPerformance: e.target.value,
                  })
                }
              />
              <span style={{ margin: '10px' }}>Better</span>{' '}
              <InputGroup.Radio
                value="better"
                checked={
                  employeeEditState.empPerformance === 'better' ? true : false
                }
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empPerformance: e.target.value,
                  })
                }
              />
              <span style={{ margin: '10px' }}>Best</span>{' '}
              <InputGroup.Radio
                value="best"
                checked={
                  employeeEditState.empPerformance === 'best' ? true : false
                }
                onChange={(e) =>
                  setEmployeeEditState({
                    ...employeeEditState,
                    empPerformance: e.target.value,
                  })
                }
              />
            </InputGroup>
            {/* {employeeEditState.empPerformance === '' && onBtnClick === true ? (
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
              value={employeeEditState.empTechSkill}
              onChange={(option) => handleSkillChange(option)}
            />
            {!employeeEditState.empTechSkill ? (
              <span style={{ color: 'red' }}>Select technology</span>
            ) : (
              <></>
            )}
          </Form.Group>

          <div className="row">
            <div className="col-md-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>{' '}
            </div>
            <div className="col-md-2">
              <Button
                variant="success"
                type="button"
                onClick={() => navigate('/employeelist')}
              >
                Back
              </Button>{' '}
            </div>
            <div className="col-md-8">
              {showMessage ? (
                <h2
                  className={
                    showError === true ? 'text-danger' : 'text-success'
                  }
                  style={{ fontSize: '20px' }}
                >
                  {showMessage}
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

export default EmployeeEdit;
