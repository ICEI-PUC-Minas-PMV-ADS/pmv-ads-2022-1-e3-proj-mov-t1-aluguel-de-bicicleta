import React from "react";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import dimensions from "../constants/Layout";

interface Props {
  onDelete: () => void;
  onCancel: () => void;
  text?: string;
}

function ConfirmationDialog({
  onDelete,
  onCancel,
  text = "",
}: Props): JSX.Element {
  return (
    <StyledConfirmationDialog>
      <StyledBackdrop />
      <StyledContainer>
        <StyledText>Are you sure you want to {text}?</StyledText>
        <StyledConfirmButton
          onPress={onDelete}
          title="Yes"
          color={Colors.light.red}
          accessibilityLabel="Yes, confirm"
        />
        <StyledCancelButton
          onPress={onCancel}
          title="Cancel"
          color={Colors.light["dark-blue"]}
          accessibilityLabel="Cancel"
        />
      </StyledContainer>
    </StyledConfirmationDialog>
  );
}

ConfirmationDialog.defaultProps = {
  text: "remove",
};

export default ConfirmationDialog;
const StyledBackdrop = styled.View`
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
`;
const StyledContainer = styled.View`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  z-index: 2;
  width: 80%;
`;
const StyledText = styled.Text`
  width: 100%;
  color: ${Colors.light.black};
  margin-bottom: 40px;
`;
const StyledConfirmButton = styled.Button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-right: 8px;
`;
const StyledCancelButton = styled.Button`
  border: none;
  background: transparent;
`;

const StyledConfirmationDialog = styled.View`
  width: ${dimensions.window.width};
  height: ${dimensions.window.height};
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
