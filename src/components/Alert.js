import React from 'react'
function Alert(props) {
    const capitalize=(word)=>{
        if(word=="danger"){
            word="error"
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (
    
    props.alert && //evaluate at first it. If it is not null go forward .
      <div className={`alert alert-${props.alert.type === 'danger' ? 'danger' : 'success'} alert-dismissible fade show`} 
  role="alert">
        <strong>{capitalize(props.alert.type)}</strong> : <strong> {props.alert.msg} </strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    
  )
}

export default Alert
