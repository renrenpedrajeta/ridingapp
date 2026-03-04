import './ExploreContainer.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';


interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
        <IonToolbar>
          <IonTitle>This is a test title</IonTitle>
        </IonToolbar>
    // <div id="container">
    //   <strong>Ready to create an app?</strong>
    //   <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    // </div>
  );
};

export default ExploreContainer;
