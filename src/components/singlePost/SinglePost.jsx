import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost({ blog }) {
  console.log(blog)
  const [blogobj, setBlogobj] = useState({})

  useEffect(() => {
    if (!blog) return
    if (blog) {
      setBlogobj({
        title: blog[0],
        content: blog[1],
        heroImage: blog[2],
        author: blog[3]
      })
    }
  }, [blog])

  console.log('sigle post')

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={`https://ipfs.infura.io/ipfs/${blogobj.heroImage}`}
          alt=""
        />
        <h1 className="singlePostTitle">
          {blogobj?.title}
          {/* <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div> */}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {blogobj?.author}
              </Link>
            </b>
          </span>
          {/* <span>1 day ago</span> */}
        </div>
        <p className="singlePostDesc">
          {blogobj?.content}
        </p>
      </div>
    </div>
  );
}
