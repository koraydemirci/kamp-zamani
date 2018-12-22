import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';

class EventChatForm extends Component {
  handleCommentSubmit = values => {
    const { addEventComment, reset, eventId, closeForm, parentId } = this.props;
    addEventComment(eventId, values, parentId);
    reset();
    if (parentId !== 0) closeForm();
  };

  render() {
    const { authenticated, openModal } = this.props;

    return (
      <Form
        onSubmit={
          authenticated
            ? this.props.handleSubmit(this.handleCommentSubmit)
            : null
        }
      >
        <Field name="comment" type="text" component={TextArea} rows={2} />
        {authenticated ? (
          <Button
            content="Yorum Ekle"
            labelPosition="left"
            icon="edit"
            primary
          />
        ) : (
          <Button
            content="Yorum Ekle"
            labelPosition="left"
            icon="edit"
            primary
            onClick={() => openModal('LoginModal')}
          />
        )}
      </Form>
    );
  }
}

export default reduxForm()(EventChatForm);
