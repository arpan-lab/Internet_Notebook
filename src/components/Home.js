import Notes from './Notes';
 export const Home = (props) => {
    const {showAlert}=props;  //de structure
     return (
        
             
             <div>
 
             <Notes showAlert={showAlert} />
         </div>
     )
 }