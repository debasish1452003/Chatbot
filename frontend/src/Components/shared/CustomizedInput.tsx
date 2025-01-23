import  TextField  from "@mui/material/TextField"
import InputLabel from '@mui/material/InputLabel';
import { BiBorderRadius, BiFontSize } from "react-icons/bi";

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomizedInput = (props: Props) =>  {
    return <TextField 
    margin="normal"   

slotProps={{
    inputLabel: {
        style: { color: "white" } 
    },
    input: {
        style: { width: "400px", borderRadius: "10px", fontSize: "20px", color: "white" } 
    }
}}

   name ={props.name} 
   label={props.label} 
   type={props.type}
   />;
};

export default CustomizedInput
