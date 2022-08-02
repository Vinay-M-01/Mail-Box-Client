
import {useRef, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import './TextEditor.css'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const myEmailId = localStorage.getItem('email')

    const toInputRef = useRef()
    const ccInputRef = useRef(null)
    const bccInputRef = useRef(null)
    const subjectInputRef = useRef()


    const [showCCBtn, setShowCCBtn] =useState(false)
    const [showBCCBtn, setShowBCCBtn] =useState(false)


    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
    }

    const submitHandler =() => {
        const enteredTo = toInputRef.current.value;
        const enteredcc = ccInputRef.current.value;
        const enteredbcc = bccInputRef.current.value;
        const enteredSubject = subjectInputRef.current.value;

        let content = convertToRaw(editorState.getCurrentContent()).blocks[0].text

        fetch(`https://mailbox-client-f1eeb-default-rtdb.firebaseio.com/${myEmailId}.json`,{
            method:"POST",
            body:JSON.stringify({
                to: enteredTo,
                cc: enteredcc,
                bcc: enteredbcc,
                subject: enteredSubject,
                content: content,
            })
        }).then((res) => {
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data => {
                    throw new Error(' Failed to Post details')
                })
            }
        }).then(data => {
            console.log(Object.values(data))
        }).catch((err) =>{
            alert(err)
          })
    }

    return ( 
    <div onSubmit={submitHandler}>
        <div className='editor'>
        <input type="text" placeholder='To:' className='tobody' ref={toInputRef}/>
        <button className='ccbcc' onClick={() => setShowCCBtn(true)} >cc /</button>
        <button className='ccbcc' onClick={() => setShowBCCBtn(true)} >bcc</button>

        {showCCBtn && <input type="text" placeholder='CC:' className='tobody' ref={ccInputRef}/>}
        {showBCCBtn && <input type="text" placeholder='BCC:' className='tobody' ref={bccInputRef}/>}
        <input type="text" placeholder='Subject:' className='subjectbody'ref={subjectInputRef}/>

        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
        
    </div> 
    <button className='sendBtn' onClick={submitHandler}>Send</button>
    </div>);
}
 
export default TextEditor;