import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSingleEmployee,
  getAllEmployees,
  getSingleEmployee,
} from './redux/actions/empAction';
import SpinnerComponent from '../components/SpinnerComponent';
import { useNavigate } from 'react-router-dom';

const EmpList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employeeList, isLoading, isError, isMessage } = useSelector(
    (state) => state.employee
  );

  console.log('employeeList-->', employeeList);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  // For employee View
  const empView = (viewId) => {
    // console.log('viewId->', viewId);
    navigate(`/redux/empview/${viewId}`);

    dispatch(getSingleEmployee(viewId));
  };

  // For employee Delete
  const empDelete = (delId) => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteSingleEmployee(delId));
    }
    dispatch(getAllEmployees());
  };

  // For Employee Edit
  const empEdit = (empEData) => {
    console.log('editId->', empEData.id);
    navigate(`/redux/empedit/${empEData.id}`, {
      state: { singleUser: empEData },
    });
    dispatch(getSingleEmployee(empEData.id));
  };

  return (
    <>
      <div className="container">
        <h1 className="m-4">
          React App Using jsonplaceholder Api Redux-Toolkit
        </h1>{' '}
        <div className="container mb-3">
          <Button variant="success" onClick={() => navigate('/redux/empadd')}>
            Add new
          </Button>
        </div>
        {isLoading === true ? (
          <>
            <SpinnerComponent />
          </>
        ) : (
          <>
            {' '}
            <table style={{ margin: '0 auto' }}>
              <thead style={{ color: 'brown' }}>
                <tr>
                  <th>Sl. NO.</th>&nbsp;&nbsp;
                  <th>Employee Name</th>&nbsp;&nbsp;
                  <th>Email</th>&nbsp;&nbsp;
                  <th>Phone no.</th>&nbsp;&nbsp;
                  <th col="3">Action</th>
                </tr>
              </thead>
              {employeeList &&
                employeeList?.map((empData, userindex) => {
                  return (
                    <>
                      <tbody key={empData.id}>
                        <tr>
                          <td>{userindex + 1}</td>
                          &nbsp;&nbsp;
                          <td>{empData.employeename}</td>
                          &nbsp;&nbsp;
                          <td>{empData.email}</td>
                          &nbsp;&nbsp;
                          <td>{empData.phone}</td>
                          &nbsp;&nbsp;
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => empView(empData.id)}
                            >
                              View
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-warning"
                              style={{
                                borderWidth: '1px',
                                borderRadius: '5px',
                              }}
                              onClick={() => empEdit(empData)}
                            >
                              Modify
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-danger"
                              style={{
                                color: '#fff',
                                borderWidth: '1px',
                                borderRadius: '5px',
                              }}
                              onClick={() => empDelete(empData.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default EmpList;
