import axios from "axios";

export async function postdata(data){
    try {
        const response = await axios.post("http://localhost:8000/login",data);
        console.log(response.data);
        alert("register successfully");
    } catch (error) {
        
        alert("Username and Email should br unique")
        
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

export async function getPostdata(setPosts){
    try {
        const response = await axios.get("http://localhost:8000/image");
        setPosts(response.data);
    } catch (error) {
        console.log(error);
        
    }
}
export async function deletePostData(id){
    console.log(id);
    try {
        const response = await axios.delete(`http://localhost:8000/delete/${id}`);
        alert("Post deleted")
    } catch (error) {
        console.log(error);
        
        
    }
}

export async function updatepost(id,data){
    try {
        const response = await axios.patch(`http://localhost:8000/posts/${id}`,data);
        alert("Post Updated Successfully"+response);
    } catch (error) {
        alert("Post not Updatede"+error);
        
    }
}

export async function postlikes(postId){
    try {
        const response = await axios.put(`http://localhost:8000/api/posts/${postId}/like`);
        alert("you liked the post")
    } catch (error) {
        console.log(error)
        alert(error)
        
    }
}

export async function commetsOnPost(id, data){
    try {
         await axios.post(`http://localhost:8000/api/posts/${id}/comment`,data);
        alert("Comment added")
        
    } catch (error) {
        console.log(error);
    }
}