import React, { Component } from 'react';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { closeModal, openModal } from './modalActions';

const actions = { closeModal, openModal };

class UnauthModal extends Component {
  handleCloseModal = () => {
    if (this.props.location.pathname.includes('/campingEvent')) {
      this.props.closeModal();
    } else {
      this.props.history.goBack();
      this.props.closeModal();
    }
  };

  render() {
    const { openModal } = this.props;
    return (
      <Modal size="mini" open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Devam etmek giriş yapmış olmalısınız!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Sayfayı görüntülemek için giriş yapın yada üye olun</p>
            <div widths={4} style={{ textAlign: 'center' }}>
              <Button
                style={{ marginRight: 30 }}
                color="teal"
                onClick={() => openModal('LoginModal')}
              >
                Giriş
              </Button>
              <Button positive onClick={() => openModal('RegisterModal')}>
                Üye Ol
              </Button>
            </div>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <p>Misafir olarak devam etmek için İptal'i tıklayın</p>
              <Button onClick={this.handleCloseModal}>İptal</Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(UnauthModal)
);
