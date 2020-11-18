import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {    
    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
            <div key={name} style={{ marginBottom: '20px' }}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });
    
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back<i className="material-icons left">arrow_back</i>
            </button>
            <button className="green darken-3 btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey 
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

// getting the SurveyForm entered data out of the redux-form store
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));