/** @format */

import { useState, useEffect } from "react";
import { Card, Container, Form, Image, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import type { PostGet, UserDataGet } from "../models/Home";
import { postGetApi, userDataGetApi } from "../services/HomeService";
import SeeMoreText from "../components/SeeMoreText";

const Home = () => {
  const [postValues, setpostValues] = useState<PostGet[] | null>([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [limit, setLimit] = useState("All");
  const [debouncedAuthor, setDebouncedAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDataGet, setuserDataGet] = useState<UserDataGet | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 100;


  // Get the User's Fullname
  useEffect(() => {
    getUserData();
  }, []);

  // Get the User's Fullname
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
  setCurrentPage(1); // Reset to page 1 on filter change
  }, [debouncedAuthor]);

  // Debounce author filter input with 2 seconds delay
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedAuthor(authorFilter.trim());
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(handler);
  }, [authorFilter]);

  // Fetch all posts
  const getPosts = () => {
    postGetApi()
      .then((res) => {
        if (res?.data) {
          // setpostValues(res?.data);
          setpostValues(
            res?.data.map((post) => ({
              ...post,
              comments: Array.isArray(post.comments) ? post.comments : [],
            }))
          );
          console.log(res.data);
          setTimeout(() => {
            setDebouncedAuthor(authorFilter.trim());
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch((e) => {
        setpostValues(null);
        setTimeout(() => {
          setDebouncedAuthor(authorFilter.trim());
          setIsLoading(false);
        }, 2000);
      });
  };

  // Filter and sort posts before rendering
  const filteredPosts = (postValues ?? [])
    ?.filter((post: { id: string }) => post.id !== "-MfANAcdZpCN4tXdT53C")
     .filter((post: { user: { username: any } }) => {
      if (!debouncedAuthor) return true;
      const usName =
        `${post.user.username}`.toLowerCase();
      return usName === debouncedAuthor.toLowerCase();
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  // Limit posts if limit is not "All"
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const limitedPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);
  // const limitedPosts =
  //   limit === "All" ? filteredPosts : filteredPosts?.slice(0, parseInt(limit));

  const getUserData = () => {
    userDataGetApi()
      .then((res) => {
        if (res?.data) {
          setuserDataGet(res?.data);
        }
      })
      .catch((e) => {
        setuserDataGet(null);
      });
  };
  return (
    <>
      <div className='d-flex flex-column min-vh-100 bg-light'>
        <Header />

        <Container className='my-3'>
          <h4 className='mb-3'>
            Welcome, {userDataGet?.firstName} {userDataGet?.lastName} !
          </h4>

          <Card className='p-3 shadow-sm border rounded'>
            <Form>
              <h5 className='mb-3'>Filter Post</h5>

              <Form.Group controlId='authorFilter' className='mb-3'>
                <Form.Label>Filter by Author</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter author name (exact match)'
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                />
                <Form.Text className='text-muted'>
                  Leave empty to show posts by all users.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='limitSelect'>
                <Form.Label>Limit Posts</Form.Label>
                <Form.Select
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                >
                  {["All", "5", "10", "15", "20"].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Card>
        </Container>

        {/* <Container className='my-3'>
        <Card className='p-3 shadow-sm border rounded'>
          <Form>
            <Form.Group controlId='postText'>
              <Form.Control
                as='textarea'
                rows={2}
                placeholder="What's on your mind?"
              />
            </Form.Group>
            <div className='mt-2 text-end'>
              <Button variant='primary' type='submit'>
                Post
              </Button>
            </div>
          </Form>
        </Card>
      </Container> */}

        {/* Show loader while debounce waiting */}
        {isLoading && (
          <div className='text-center my-5'>
            <Spinner animation='border' role='status' />
            <div>Loading posts...</div>
          </div>
        )}

        {/* Show posts or No Post Matched */}
        {!isLoading && limitedPosts?.length === 0 && (
          <div className='text-center my-5'>
            <h5>No Post Matched</h5>
          </div>
        )}

        {!isLoading &&
          limitedPosts?.map((post) => (
            <Container key={post.id} className='my-3'>
              <Card className='p-2 shadow-sm border rounded mb-3'>
                <Card.Body>
                  {/* Post Header */}
                  <div className='d-flex justify-content-between align-items-center mb-2'>
                    <strong>
                      <span className='m-2'>
                        <Image
                          src={post.user.profilePic || "#"} // fallback to '#' if no profilePic
                          alt='Logo'
                          roundedCircle
                          width={40}
                          height={40}
                          style={{ objectFit: "cover" }}
                        />
                      </span>
                      {post.user.username}
                    </strong>
                    <small className='text-muted'>
                      {new Date(post.createdAt).toLocaleString()}
                    </small>
                  </div>

                  {/* Post Content */}
                  <Card.Text>
                    <SeeMoreText text={post.text} />
                  </Card.Text>

                  {/* Comments */}
                  <hr />
                  <div>
                    <p className='text-gray'>Comments</p>
                    {(post.comments || []).map((comment) => (
                      <div className='m-3' key={comment.id}>
                        <strong>{comment.username}</strong>{" "}
                        <small className='text-muted'>
                          {new Date(comment.createdAt).toLocaleString()}
                        </small>
                        <p className='mb-2'>{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  {/* 
          <Form className='mt-3'>
            <Form.Group controlId={`commentText-${post.id}`}>
              <Form.Control
                as='textarea'
                rows={2}
                placeholder='Write a comment...'
              />
            </Form.Group>
            <div className='mt-2 text-end'>
              <Button variant='primary' type='submit'>
                Comment
              </Button>
            </div>
          </Form> 
          */}
                </Card.Body>
              </Card>
            </Container>
          ))}

        {!isLoading && filteredPosts?.length > postsPerPage && (
        <div className='text-center my-4'>
          {Array.from({
            length: Math.ceil(filteredPosts?.length / postsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
