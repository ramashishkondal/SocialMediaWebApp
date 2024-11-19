import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { supabase } from "../../../Shared/SupabaseClient";
import { useStorePostDataMutation } from "../../../Services/Api/module/posts";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { useStoreMultipleTagsMutation } from "../../../Services/Api/module/postsTags";
import { extractUsernamesFromTags } from "../../../Utils/commonFuncs";

const PostComposer = () => {
  const [postText, setPostText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const [storePost] = useStorePostDataMutation();
  const [storeTags] = useStoreMultipleTagsMutation();
  const { id, name, profilePictureUrl } = useSelector(
    (state: RootState) => state.user
  );

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const storePostData = async () => {
    if (image == null && postText === null) {
      return;
    }
    let url = null;
    setUploading(true);
    if (image) {
      // Generate a unique file name (you can customize this)
      const filePath = `posts/images/${Date.now()}_${image.name}`;

      // Upload the image to Supabase Storage
      const { error } = await supabase.storage
        .from("SocialMediaImages") // Replace with your Supabase bucket name
        .upload(filePath, image, { upsert: false });

      if (error) {
        console.log("Error uploading image:", error);
        setUploading(false);
        return;
      }

      // Get the public URL of the uploaded image
      url = supabase.storage
        .from("SocialMediaImages") // Replace with your bucket name
        .getPublicUrl(filePath).data.publicUrl;
    }
    const response = await storePost({
      byUserId: id,
      imageUrl: url,
      text: postText,
    });
    if ("error" in response) {
      console.error("Error storing post:", response.error);
    } else {
      const rawTagsDataFromPost = extractUsernamesFromTags(postText);
      const filteredTagsFromPost: string[] = rawTagsDataFromPost.filter(
        (item, index) => rawTagsDataFromPost.indexOf(item) === index
      );
      if (filteredTagsFromPost.length > 0) {
        const tags: { postId: string; userName: string }[] =
          filteredTagsFromPost.map((val) => ({
            postId: response.data[0].id,
            userName: val,
          }));
        await storeTags(tags);
      }
    }

    setPostText("");
    setImage(null);
    setImageUrl(null);
    setUploading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Create a temporary URL to display the image before uploading
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };
  const handlePostSubmit = () => {
    storePostData();
  };

  return (
    <div className="flex flex-col w-full border border-gray-700 bg-black text-white p-4 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <img
            src={
              profilePictureUrl
                ? profilePictureUrl
                : "https://via.placeholder.com/40"
            }
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{name}</p>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div>
        <textarea
          placeholder="What is happening?!"
          className="w-full bg-black text-white border-none outline-none resize-none text-lg mb-4"
          rows={3}
          maxLength={100}
          value={postText}
          onChange={handlePostChange}
        />
      </div>

      {/* Display the selected image */}
      {image && (
        <div className="my-2">
          <img
            src={imageUrl === null ? undefined : imageUrl}
            alt="Uploaded Image"
            className="max-w-full rounded-md"
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 text-blue-400">
          {/* Image Upload Trigger */}
          <label>
            <FaImage size={20} className="cursor-pointer" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded ${
            postText.trim() === "" && !image
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={postText.trim() === "" && !image}
          onClick={handlePostSubmit}
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostComposer;
