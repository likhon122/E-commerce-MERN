/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import { Info } from "phosphor-react";
import { Button, Checkbox, Label, Modal, Typography } from "keep-react";
import { useNavigate } from "react-router-dom";

export const ModalComponent = ({
  modalName = "modalName",
  extraClass = "",
  handleClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [logOut, setLogOut] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const openModal = () => {
    setIsOpen(true);

  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (logOut) {
      navigate("/log-out");
    }
  }, [navigate, logOut]);

  const successHandler = () => {
    if (isAgree) {
      setLogOut(true);
      setIsOpen(false);
      setIsAgree(false);
    }
  };
  const rejectHandler = () => {
    setIsOpen(false);
    setIsAgree(false);
  };
  return (
    <>
      <div className={`${extraClass}`}>
        <h1 onClick={openModal}>{modalName}</h1>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <Modal.Body className="space-y-3">
            <Modal.Icon>
              <Info size={28} weight="fill" />
            </Modal.Icon>
            <Modal.Content>
              <Typography variant="div" className="!mb-6">
                <Typography
                  variant="h3"
                  className="mb-2 text-body-1 font-medium text-metal-900"
                >
                  Update Modal Status
                </Typography>
                <Typography
                  variant="p"
                  className="text-body-4 font-normal text-metal-600"
                >
                  Your document has unsaved changes. Discard or save them as a
                  new page to continue.
                </Typography>
              </Typography>
              <Typography
                variant="fieldset"
                className="mb-3 flex items-center gap-2"
              >
                <Checkbox id="checkbox" onChange={() => setIsAgree(!isAgree)} />
                <Label
                  htmlFor="checkbox"
                  className="text-body-4 font-normal text-metal-600"
                >
                  I understand, no need to repeat
                </Label>
              </Typography>
            </Modal.Content>
            <Modal.Footer>
              <Button
                onClick={rejectHandler}
                size="sm"
                variant="outline"
                color="secondary"
                disabled={isAgree}
              >
                Cancel
              </Button>
              <Button
                onClick={successHandler}
                size="sm"
                color="primary"
                disabled={!isAgree}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
