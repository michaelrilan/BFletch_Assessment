import React, { useState } from 'react';
import { Form, Button, Image, Spinner } from 'react-bootstrap';

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

    </div>
  );
};

export default CommentSection;
