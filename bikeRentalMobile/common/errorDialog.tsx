// import * as React from 'react';
// import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

// const ErrorDialog = () => {
//   const [visible, setVisible] = React.useState(false);
//   const hideDialog = () => setVisible(false);

//   return (
//     <Portal>
//       <Dialog visible={visible} onDismiss={hideDialog}>
//           <Dialog.Content>
//             <Paragraph>Please, complete all fields</Paragraph>
//           </Dialog.Content>
//           <Dialog.Actions>

//           <Button onPress={() => console.log('Ok')}>Ok</Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//   );
// };

// export default ErrorDialog;

import React from "react";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import dimensions from "../constants/Layout";

interface Props {
  onCancel: () => void;
  text?: string;
}

function ConfirmationDialog({
  onCancel,
  text = "",
}: Props): JSX.Element {
  return (
    <StyledConfirmationDialog>
      <StyledBackdrop />
      <StyledContainer>
        <StyledText>Complete all fields for this {text}.</StyledText>
        <StyledCancelButton
          onPress={onCancel}
          title="Ok"
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
