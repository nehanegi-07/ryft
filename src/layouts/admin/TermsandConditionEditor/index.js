import React, { useState,useEffect } from 'react';
import { EditorState, convertToRaw,convertFromHTML,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import MDBox from 'components/MDBox';
import { Card, Grid } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import "./index.css"
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import { useMutation } from "react-query";
import { notifyError, notifySuccess } from "components/Messages";
import { updateTermsAndConditions } from "services/Admin.Services"
import { getTermsAndConditions } from 'services/User.Services';


const EditorForTermsandCondition = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
     };
    
  const preview = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  
   const { mutate } = useMutation(updateTermsAndConditions, {
        onSuccess: (res) => {
            notifySuccess("Saved Successfully ")
        },
        onError: (error) => {
            notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
        },
   });
  
  const submitContent = () => {
    mutate({content:content})
  }

   useEffect(() => {
     const callbackFn = async () => {
      const result = await getTermsAndConditions();
      const { data } = result.data;
     setEditorState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`${data?.content}`)
        )
      ),);
    };
    callbackFn();
   }, []);
  
  const resetContent = () => {
  
     const callbackFn = async () => {
      const result = await getTermsAndConditions();
       const { data } = result.data;
     setEditorState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`${data?.content}`)
        )
      ),);
    
    };
    callbackFn();
  }
  
    return (
  <MDBox py={3}>
      <MDBox>
        <Grid container spacing={3} sx={{xs:{display:"flex",flexDirection:"columns",height:"100vh"}}}>
          <Grid item xs={12} lg={6} >
              <Editor
          initialEditorState={editorState}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
  
            
          </Grid>
          <Grid item xs={12} lg={6} >
           <Card sx={{ display: "flex", alignItems: "center",mb:2,borderRadius:0 }} >
            <MDBox  sx={{display:"flex",alignItems:"center",width:"100%",justifyContent:"center",pt:2,pb:2}} >
              <MDTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold" >
                Preview
              </MDTypography>
                    </MDBox>
                  </Card>
                  <Card overflowWrap="break-word" sx={{ overflowY:"scroll",height: "500px",width:"100%", display: "flex", alignItems: "center", flexWrap:"wrap",pt:4,borderRadius:0}}> 
                <MDBox
                  overflowWrap="break-word"
                
                    sx={{pl:4,pr:2,width:"95%"}} 
                    dangerouslySetInnerHTML={{__html: preview}}
                    />
          </Card>
          </Grid>
        </Grid>
      </MDBox>
       <MDBox mt={4} mb={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                        <MDButton color="info" type="submit" onClick={(e)=>submitContent(e)}>
                                            Submit
                                        </MDButton>
                                        <MDButton color="info"  onClick={(e)=>resetContent(e)}>
                                            Reset
                                        </MDButton>
                                    </MDBox>
    </MDBox>

    )
}

export default EditorForTermsandCondition;
