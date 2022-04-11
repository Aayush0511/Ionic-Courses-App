import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput } from "@ionic/react";
import React from "react";

const EditModal: React.FC<{show: boolean, onCancel: () => void, editedGoal: { id: string, text: string } | null }> = (props) => {
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.editedGoal ? "Edit" : "Add"} goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Your Goal</IonLabel>
                        {console.log(props)}
                        <IonInput type="text" value={props.editedGoal?.text}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
                <IonCol>
                    <IonButton color="secondary" fill="clear" onClick={props.onCancel}>Cancel</IonButton>
                </IonCol>
                <IonCol>
                    <IonButton color="secondary" expand="block">Save</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
