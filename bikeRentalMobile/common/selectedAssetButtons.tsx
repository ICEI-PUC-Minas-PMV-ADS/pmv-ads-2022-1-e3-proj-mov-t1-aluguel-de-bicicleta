import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/native";
import ConfirmationDialog from "./confirmationDialog";

interface IProps {
  onDelete: () => void;
}

function SelectedAssetButtons({ onDelete }: IProps): JSX.Element {
  const location = useLocation().pathname;
  const [showModal, setShowModal] = useState(false);

  function handleDelete(): void {
    onDelete();
    setShowModal(false);
  }

  return (
    <StyledSelectedAssetButtons className="selectedAssetButtons">
      <Link
        to={`${location}/edit`}
        className="selectedAssetButtons--edit"
        aria-label="editar"
      >
        <i className="far fa-edit" />
      </Link>
      <button
        type="button"
        className="selectedAssetButtons--remove"
        onClick={() => setShowModal(true)}
        aria-label="deletar"
      >
        <i className="far fa-trash-alt" />
      </button>
      {showModal ? (
        <ConfirmationDialog
          onCancel={() => setShowModal(false)}
          onDelete={() => handleDelete()}
        />
      ) : null}
    </StyledSelectedAssetButtons>
  );
}

export default SelectedAssetButtons;

const StyledSelectedAssetButtons = styled.div`
  width: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: var(--padding);
  right: var(--padding);
  .selectedAssetButtons {
    &--edit,
    &--remove,
    &--favourite {
      padding: 15px;
      background: transparent;
      color: var(--dark-blue);
      border: none;
      font-size: 18px;
      transform: translate(10px, -25%);
    }
    &--remove {
      color: var(--red);
    }
    &--favourite {
      color: var(--dark-gray);
    }
  }
`;
