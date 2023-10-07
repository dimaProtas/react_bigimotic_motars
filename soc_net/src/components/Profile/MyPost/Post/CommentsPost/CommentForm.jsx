import React from "react";
import { Formik, Field, Form } from "formik";
import s from './Comment.module.css';


const CommentForm = (props) => {
    return (
        <Formik 
            initialValues={{comment: ''}}
            onSubmit = {(values, { setValues }) => {
                props.postComment(values.comment, props.postId)
                props.toggleComments()
                setValues({ comment: '' });
            }}>
            <Form>
                <div className={s.commentInput}>
                    <Field placeholder='coment..' name='comment' type='input'  />
                </div>
            </Form>
        </Formik>
    )
}


export default CommentForm