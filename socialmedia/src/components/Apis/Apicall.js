import axios from "axios";

export async function postdata(data){
    try {
        const response = await axios.post("http://localhost:8000/login",data);
        console.log(response.data);
        alert("register successfully");
    } catch (error) {
        console.log(error);
        alert(error)
        
    }
}
export async function getdata(setData){
    try {
        const response = await axios.get("http://localhost:8000/");
        setData(response.data);
    } catch (error) {
        console.log(error);
        
    }
}