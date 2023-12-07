import { BiArrowFromRight } from "react-icons/bi"; 
import { AiFillEdit } from "react-icons/ai"; 
import { FcRemoveImage } from "react-icons/fc"; 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments, updateComment, removeComment } from "../../store/slices/comment/slice";
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from "../../hookes/cookiesfun";
import moment from "moment";
import { motion } from "framer-motion";

 

const CommentComponent = ( ) => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { artworkid   } = useParams();
  const { isLoading, comments , resMessage} = useSelector((state) => state.commentslice);
   
  const [newCommentText, setNewCommentText] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState(null);
  const [updatedCommentText, setUpdatedCommentText] = useState("");

  useEffect(() => {
    // Fetch comments when the component mounts
    dispatch(fetchComments(artworkid));
  }, [dispatch]);

  const handleAddComment = () => {
    // Dispatch the addComment action 
 
    dispatch(addComment({idArtwork:artworkid, commentText: newCommentText ,token:getCookie("usertoken")}));
    setNewCommentText(""); // Clear the input field after adding
  };

  const handleUpdateComment = () => {


    
    // Dispatch the updateComment action
    dispatch(updateComment({ id: updateCommentId, updatedText: updatedCommentText }));
    setUpdateCommentId(null); // Clear the updateCommentId state
    setUpdatedCommentText(""); // Clear the input field after updating
  };

  const handleRemoveComment = (commentId) => {
    // Dispatch the removeComment action
    dispatch(removeComment(commentId));
  };

  

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded shadow h-screen overflow-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-yellow-400 ">
      <div className=" flex justify-between items-center">  
         <button className=" p-1   bg-yellow-400 rounded-full m-1" onClick={() => navigate(-1)}>
           <BiArrowFromRight  className=" fill-blue-700 h-10 w-10"/>
          </button>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2></div>

      {/* Add Comment Form */}
      <div className="mb-4">
        <input
          className="w-full border rounded py-2 px-3"
          type="text"
          placeholder="New Comment"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
          onClick={handleAddComment}
          disabled={isLoading}
        >
          Add Comment
        </button>
      </div>

      {/* Update Comment Form */}
      {updateCommentId && (
        <div className="mb-4">
          <input
            className="w-full border rounded py-2 px-3"
            type="text"
            placeholder="Updated Comment"
            value={updatedCommentText}
            onChange={(e) => setUpdatedCommentText(e.target.value)}
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-2"
            onClick={handleUpdateComment}
            disabled={isLoading}
          >
            Update Comment
          </button>
        </div>
      )}

      {/* Comments List */}
      <ul>
        {comments.map((comment,index) => (
          <motion.li 
          initial={{ opacity: 0,transform:"rotateY(90deg)" }}
          whileInView={{ opacity: 1,transform:"rotateY(0deg)"  }}
          transition={{
            duration: 1,   
            delay:index/4
        
          }}
          key={comment.id} className="mb-2">
            <div className="bg-gray-100 p-2 rounded flex justify-between">
              <span>{comment.txt}</span>
            <span className=" text-yellow-400 font-bold"> {formatTimeAgo(comment.createdAt)}</span>
            </div>
            <div className=" flex justify-end">
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded ml-2"
              onClick={() => setUpdateCommentId(comment.id)}
            >
               <AiFillEdit className=" w-8 h-8" />
            </button>
            <button className="bg-red-500 text-white py-1 px-2 rounded ml-2" onClick={() => handleRemoveComment(comment.id)} disabled={isLoading} >   
            <FcRemoveImage className="  w-8 h-8"  />    </button>
            </div>

          </motion.li>
        ))}
      </ul>
    </div>
  );
};





function formatTimeAgo(createdAt) {
  const now = moment();


  console.log(now)
  
  const commentTime = moment(createdAt);
  const diffMinutes = now.diff(commentTime, 'minutes');
  const diffHours = now.diff(commentTime, 'hours');

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else {
    return `${diffHours} hours ago`;
  }
}
export default CommentComponent;




