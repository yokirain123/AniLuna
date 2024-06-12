import React, { useEffect } from "react";
import styled from 'styled-components';
import { IoCloseCircleOutline } from "react-icons/io5";

function Popup({ trigger, setTrigger, characters = [], children }) {
  useEffect(() => {
    if (trigger) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Clean up by restoring the original overflow style when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [trigger]);

  return trigger ? (
    <ModalOverlay onClick={() => setTrigger(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setTrigger(false)}>
          <IoCloseCircleOutline size={30} />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  ) : null;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ModalContent = styled.div`
  position: relative;
  background: #242126;
  padding: 20px;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 80%;
  overflow-y: auto;
  z-index: 1001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #be92f6;
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Character = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CharacterImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const CharacterName = styled.p`
  margin: 0;
`;

export default Popup;
