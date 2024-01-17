import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FacultyProfile.css';
import classNames from 'classnames';

const FacultyProfile = (props) => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [academicEditMode, setAcademicEditMode] = useState(false);
  const [formData, setFormData] = useState({}); // Placeholder for form data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/fetch/faculty/email/${props.email_id}`);
        setFacultyData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.email_id]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    // Reset formData when switching modes
    setFormData({});
  };

  const toggleAcademicEditMode = () => {
    setAcademicEditMode(!academicEditMode);
    // Reset formData when switching modes
    setFormData({});
  };

  const handleFormChange = (key, value) => {
    if (key.includes('academicperformance')) {
      const [parentKey, index, nestedKey] = key.split('_');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: [
          ...(prevFormData[parentKey] || []),
          {
            ...((prevFormData[parentKey] && prevFormData[parentKey][index]) || {}),
            [nestedKey]: value,
          },
        ],
      }));
    } else {
      setFormData({
        ...formData,
        [key]: value,
      });
    }
  };

  const renderAcademicData = (value) => {
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
      // Handling AcademicPerformance specifically for arrays of objects
      return (
        <div>
          {value.map((item, index) => (
            <div key={index} style={{ marginLeft: '20px', marginBottom: '10px' }}>
              {Object.keys(item).map((nestedKey) => (
                // Exclude rendering 'id' attribute
                nestedKey !== '_id' && (
                  <div key={nestedKey} style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '10px' }}>{nestedKey.charAt(0).toUpperCase() + nestedKey.slice(1)}:</strong>
                    <div>{academicEditMode ? (
                      <input
                        type="text"
                        value={formData[`academicperformance_${index}_${nestedKey}`] || item[nestedKey].toString()}
                        onChange={(e) => handleFormChange(`academicperformance_${index}_${nestedKey}`, e.target.value)}
                      />
                    ) : (
                      <div>{item[nestedKey]}</div>
                    )}
                    </div>
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      );
    } else {
      return <div>{academicEditMode ? JSON.stringify(value) : value}</div>;
    }
  };

  const saveChanges = async () => {
    try {
      // Make an API call to save changes using formData
      // Example:
      // await axios.put(`http://localhost:8000/update/faculty/email/${props.email_id}`, formData);
      if (editMode || academicEditMode) {
        await axios.put(`http://localhost:8000/update/faculty/email/${props.email_id}`, formData);
      }

      // Refresh data after saving changes
      const response = await axios.get(`http://localhost:8000/fetch/faculty/email/${props.email_id}`);
      setFacultyData(response.data);
      setEditMode(false);
      setAcademicEditMode(false);
      setFormData({}); // Reset formData after saving changes
    } catch (error) {
      console.error('Error saving changes:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classNames('container')}>
      <h1 className={classNames('main-heading')}>Personal Details</h1>
      <button className={classNames('edit-button')} onClick={toggleEditMode}>
        {editMode ? 'Cancel Edit' : 'Edit Personal Details'}
      </button>
      {facultyData.map((row, index) => (
        <div key={index} className={classNames('personal-details')}>
          {Object.keys(row).map((key) => (
            !['_id', '__v', 'AcademicPerformance'].includes(key) && (
              <div key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      value={formData[key] || row[key].toString()}
                      onChange={(e) => handleFormChange(key, e.target.value)}
                    />
                  </div>
                ) : (
                  <div>{row[key]}</div>
                )}
              </div>
            )
          ))}
          <hr className={classNames('divider')} />
        </div>
      ))}
      {editMode && (
        <div>
          <button className={classNames('save-button')} onClick={saveChanges}>
            Save Personal Details
          </button>
        </div>
      )}

      <div>
        <h1 className={classNames('main-heading')}>Academic Performance</h1>
        <button className={classNames('edit-button')} onClick={toggleAcademicEditMode}>
          Edit Academic Performance
        </button>
        <div className={classNames('academic-performance')}>
          {facultyData.map((row, index) => (
            <div key={index}>
              {row.AcademicPerformance && row.AcademicPerformance.length > 0 ? (
                renderAcademicData(row.AcademicPerformance)
              ) : (
                <div>No Academic Performance data available</div>
              )}
            </div>
          ))}
        </div>
        {academicEditMode && (
          <div>
            <button className={classNames('save-button')} onClick={saveChanges}>
              Save Academic Performance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyProfile;
