import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ConfirmationDialog from "./confirmationDialog";
import { RootStackParamList } from "../types";
import { defaultPadding } from "../constants/Layout";
import Colors from "../constants/Colors";

interface IProps {
  onDelete: () => void;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "SelectedBike" | "SelectedReservation"
  >;
  asset: PostBike | PostReservation;
  returnRoute: "AddBike" | "AddReservation";
}

function SelectedAssetButtons({
  onDelete,
  navigation,
  asset,
  returnRoute,
}: IProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  function handleDelete(): void {
    onDelete();
    setShowModal(false);
  }

  return (
    <StyledSelectedAssetButtons>
      <StyledButton
        aria-label="editar"
        onPress={() => navigation.navigate(returnRoute, { asset })} // remover o add bike e fazer ele dinamico
      >
        <FontAwesome name="edit" size={30} color={Colors.light["dark-blue"]} />
      </StyledButton>
      <StyledButton onPress={() => setShowModal(true)} aria-label="deletar">
        <FontAwesome name="trash" size={30} color={Colors.light.red} />
      </StyledButton>
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

const StyledSelectedAssetButtons = styled.View`
  width: auto;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: ${defaultPadding};
  right: ${defaultPadding};
`;

const StyledButton = styled.Pressable`
  margin-left: 15px;
`;
