import React, { useState } from 'react';
import { Form, Button, Image, Spinner } from 'react-bootstrap';
import { createCommentApi } from '../services/HomeService';
import { toast } from 'react-toastify';

type Comment = {
  id: string | number;
  username: string;
  createdAt: string;
  text: string;
};

type Props = {
  comments: Comment[];
  postId: string | number;
  userprofilePic: string;
};

const CommentSection: React.FC<Props> = ({ comments: initialComments, postId, userprofilePic }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [loading, setLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleCreateComment = async () => {
    if (!commentText.trim()) return;

    try {
      setLoading(true);

      const response = await createCommentApi(commentText, `${postId}`);
      if (response?.data) {
        const newComment: Comment = {
          id: response.data.id,
          username: response.data.username,
          createdAt: response.data.createdAt,
          text: response.data.text,
        };

        setComments([...comments, newComment]);
        setCommentText('');
      }
    } catch (err) {
      toast.error('Failed to post comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sort comments by creation time (latest last)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Show only last 3 comments unless "view all" is toggled
  const visibleComments = showAllComments ? sortedComments : sortedComments.slice(-3);

  return (
    <div>
      <p className='text-gray'>Comments</p>

      {visibleComments.map((comment) => (
        <div className='m-3' key={comment.id}>
          <strong>{comment.username}</strong>{' '}
          <small className='text-muted'>
            {new Date(comment.createdAt).toLocaleString()}
          </small>
          <p className='mb-2'>{comment.text}</p>
        </div>
      ))}

      {/* View More / Less Button */}
      {comments.length > 3 && (
        <div className='text-center mb-3'>
          <Button
            variant='link'
            onClick={() => setShowAllComments(!showAllComments)}
            className='p-0'
          >
            {showAllComments ? 'View Less Comments' : 'View More Comments'}
          </Button>
        </div>
      )}

      {/* Add Comment Section */}
      <div className='mt-3 d-flex align-items-start gap-2'>
        <Image
          src={userprofilePic || '#'}
          alt='Profile'
          roundedCircle
          width={35}
          height={35}
          style={{ objectFit: 'cover', marginTop: '5px' }}
        />

        <Form.Group controlId={`commentText-${postId}`} className='flex-grow-1'>
          <textarea
            rows={1}
            placeholder='Write a comment...'
            className='w-100 form-control'
            id={`commentText-${postId}`}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>

        <Button
          variant='primary'
          style={{ height: 'fit-content', marginTop: '5px' }}
          onClick={handleCreateComment}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-send'
              viewBox='0 0 16 16'
            >
              <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z' />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
