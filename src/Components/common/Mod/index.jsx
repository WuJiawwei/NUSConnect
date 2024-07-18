import React from 'react';
import { Modal, Button } from 'antd';
import "./index.scss"

const ModComponent = ({ 
  modalOpen, 
  setModalOpen, 
  sendStatus, 
  setStatus, 
  status}) => {
  return (
    <>
      <Modal
        title="Create a reminder"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            <Button 
              onClick={sendStatus}
              key="submit" 
              type="primary" 
              disabled={status.length > 0 ? false : true}
            >
              Add
            </Button>
        ]}
      >
        <input 
          className="modal-input"
          placeholder="Note down key dates and events" 
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};

export default ModComponent;