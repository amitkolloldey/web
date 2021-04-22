import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {  getExamSubmissions} from "../redux/actions/examAction";
import {Link} from "react-router-dom";
import NotFoundPage from "./notfoundpage";
import ViewSubmissionModal from "../components/viewsubmission.component";

const ExamAllSubmissions = ({loading, match, dispatchGetExamSubmissionsAction}) => {

    const [submissions, setSubmission] = useState();

    const {examId} = match.params;

    let [selectedSubmission, setSelectedSubmission] = useState();

    useEffect(() => {
        dispatchGetExamSubmissionsAction(examId, (response) => {
            setSubmission(response.data);
        });
    }, []);

    return (
        <div className='right_wrapper'>
            <h2 className='page_title'>All Submissions For {examId}</h2>
            <div className='main_content'>
                <div className="request_form">
                    {
                        submissions && submissions.length ? (
                            <>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Exam Title</th>
                                        <th>Submitter Name</th>
                                        <th>Score</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        submissions.map(function (submission) {
                                            return (
                                                <tr>
                                                    <td>{submission.Exam.title}</td>
                                                    <td>{submission.User.name}</td>
                                                    <td><span className='badge badge-info'>{submission.score}</span></td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={`#`} target='_blank'
                                                                  className='btn btn-primary tbl_btn ml-2 mr-2'
                                                                  onClick={async function (e) {
                                                                      e.preventDefault();
                                                                      await setSelectedSubmission(submission);
                                                                      window.$('#viewSubmissionModal').modal({
                                                                          backdrop: 'static',
                                                                          keyboard: false,
                                                                          show: true
                                                                      })
                                                                  }}>View Details</Link>
                                                            <Link
                                                                to={`/exam_submission/${submission.examId}/preview`}
                                                                target='_blank' className='btn btn-dark tbl_btn'>Preview Exam</Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </>
                        ) : <NotFoundPage/>
                    }
                    {selectedSubmission ? (<ViewSubmissionModal selectedSubmission={selectedSubmission}  />) : ''}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    dispatchGetExamSubmissionsAction: (examId, onSuccess) =>
        dispatch(getExamSubmissions(examId, onSuccess))
})

const mapStateToProps = (state) => ({
    loading: state.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamAllSubmissions)



