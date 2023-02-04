import { useEffect, useState } from "react";
import { useContract } from "../../context/ContractProvider";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const { blogFactoryContract, userAccount } = useContract()
  const [posts, setPost] = useState()

  useEffect(() => {
    if (!blogFactoryContract) return

    blogFactoryContract.methods.getAllBlogs().call({ from: userAccount.account }).then(posts => {
      // console.log(posts)
      setPost(posts)
    })

  }, [blogFactoryContract])

  return (
    <div className="posts">
      {posts && posts.map(post => (
        <>
          <Post post={post} />
        </>
      ))}

    </div>
  );
}
