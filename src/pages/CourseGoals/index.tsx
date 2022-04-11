import React, { useRef, useState } from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { useParams } from "react-router";
import { COURSE_DATA } from "../Courses";
import { addOutline, create, trash } from "ionicons/icons";
import EditModal from "../../components/EditModal";

const CourseGoals = () => {
  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  const selectedCourse = COURSE_DATA.find((c) => c.id === selectedCourseId);
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const startDeleteItemHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    setStartedDeleting(true);
  };

  const deleteItemHandler = () => {
    setStartedDeleting(false);
    setToastMessage("Deleted");
  };

  const editItemHandler = (goalId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const goal = selectedCourse?.goals.find((g) => g.id === goalId);
    slidingOptionsRef.current?.closeOpened();
    if (!goal) {
      return;
    }
    setIsEditing(true);
    setSelectedGoal(goal);
  };

  const cancelEditItemHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  };

  const addItemHandler = () => {
    setToastMessage("Added");
    setSelectedGoal(null);
  };

  return (
    <React.Fragment>
      <EditModal
        show={isEditing}
        onCancel={cancelEditItemHandler}
        editedGoal={selectedGoal}
      ></EditModal>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage("")}
      ></IonToast>
      <IonAlert
        isOpen={startedDeleting}
        header="Are you sure?"
        message="Do you want to delete this goal? This action cannot be undone"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => setStartedDeleting(false),
          },
          {
            text: "Yes",
            handler: () => deleteItemHandler(),
          },
        ]}
      ></IonAlert>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse.title : "No course found!"}
            </IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={addItemHandler}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList lines="full" className="ion-margin-top">
            {selectedCourse?.goals.map((goal) => (
              <IonItemSliding key={goal.id} ref={slidingOptionsRef}>
                <IonItemOptions side="start">
                  <IonItemOption
                    onClick={startDeleteItemHandler}
                    color="danger"
                  >
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
                <IonItem>
                  <IonLabel>{goal.text}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={editItemHandler.bind(null, goal.id)}>
                    <IonIcon slot="icon-only" icon={create}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
          {isPlatform("android") && (
            <IonFab
              className="ion-margin-end ion-margin-bottom"
              horizontal="end"
              vertical="bottom"
              slot="fixed"
            >
              <IonFabButton color="secondary" onClick={addItemHandler}>
                <IonIcon icon={addOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default CourseGoals;
