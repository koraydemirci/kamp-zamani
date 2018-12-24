import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';

class PlaceChatForm extends Component {
  handleCommentSubmit = values => {
    const { addPlaceComment, reset, placeId, closeForm, parentId } = this.props;
    addPlaceComment(placeId, values, parentId);
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
            onClick={() => openModal('UnauthModal')}
          />
        )}
      </Form>
    );
  }
}

export default reduxForm()(PlaceChatForm);
