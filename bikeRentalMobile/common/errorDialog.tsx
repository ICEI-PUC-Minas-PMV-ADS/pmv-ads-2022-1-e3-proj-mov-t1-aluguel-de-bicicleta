import * as React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

const ErrorDialog = () => {
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Please, complete all fields</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>

          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ErrorDialog;