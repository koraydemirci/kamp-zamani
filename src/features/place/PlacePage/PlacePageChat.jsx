import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Comment } from 'semantic-ui-react';
import PlaceChatForm from './PlaceChatForm';

class PlacePageChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false
    });
  };

  render() {
    const {
      addPlaceComment,
      placeId,
      placeChat,
      authenticated,
      openModal
    } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;

    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: 'none' }}
        >
          <Header>YORUMLAR</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {placeChat &&
              placeChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || '/assets/user.png'}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {comment.date &&
                          new Date(comment.date).toLocaleDateString('tr', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Cevapla
                      </Comment.Action>
                      {showReplyForm && selectedCommentId === comment.id && (
                        <PlaceChatForm
                          addPlaceComment={addPlaceComment}
                          placeId={placeId}
                          form={`reply_${comment.id}`}
                          closeForm={this.handleCloseReplyForm}
                          parentId={comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                      <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            src={child.photoURL || '/assets/user.png'}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {child.date &&
                                  new Date(child.date).toLocaleDateString(
                                    'tr',
                                    {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric'
                                    }
                                  )}
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Actions>
                              {showReplyForm &&
                                selectedCommentId === child.id && (
                                  <PlaceChatForm
                                    addPlaceComment={addPlaceComment}
                                    placeId={placeId}
                                    form={`reply_${child.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                    parentId={child.parentId}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <PlaceChatForm
            addPlaceComment={addPlaceComment}
            placeId={placeId}
            form={'newComment'}
            parentId={0}
            authenticated={authenticated}
            openModal={openModal}
          />
        </Segment>
      </div>
    );
  }
}

export default PlacePageChat;
