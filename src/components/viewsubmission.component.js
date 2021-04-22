import {connect} from "react-redux";
import {updateExam} from "../redux/actions/chapterAction";
import React from "react";

function ViewSubmissionModal({selectedSubmission, dispatchUpdateExamAction}) {
    console.log(selectedSubmission)
    return selectedSubmission ? (
        <>
            <div className="modal" id="viewSubmissionModal" tabIndex="-1" role="dialog">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-right d-block">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">
                                <i className="fas fa-times"/> Close
                            </button>
                        </div>
                        <div className="modal-body submission_details">
                            <p>
                                <strong>Exam Title:</strong> {selectedSubmission.Exam.title}
                            </p>
                            <p>
                                <strong>Submitter:</strong> {selectedSubmission.User.name}
                            </p>
                            <p>
                                <strong>Score:</strong> {selectedSubmission.score}
                            </p>
                            <p>
                                <strong>Answers:</strong>
                            </p>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Question Number</th>
                                    <th>Question</th>
                                    <th>Given Answer(s)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    selectedSubmission.answers.map(function (submission) {
                                            return (
                                                <tr>
                                                    <td>{submission.number}</td>
                                                    <td>{submission.question}</td>
                                                    <td>{submission.answer.map(function (answer) {
                                                        return <p>
                                                            {answer}
                                                        </p>
                                                    })}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-footer text-right d-block">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">
                                <i className="fas fa-times"/> Close
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    ) : 'Waiting To Load'
}

const mapStateToProps = (state) => ({
    loading: state.loading
});


export default connect(mapStateToProps)(ViewSubmissionModal)