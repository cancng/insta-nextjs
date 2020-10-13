import Link from 'next/link';
import { Card, Col } from 'react-bootstrap';
import { FaComment, FaHeart } from 'react-icons/fa';
import Moment from 'react-moment';
import 'moment/locale/tr';

const Post = ({ photos }) => {
  console.log('PHOTOS:: ', photos);
  return (
    <>
      {photos.edges.map((post) => (
        <Col md={4} xs={12} key={post.node.id}>
          <Link href={`/media/${post.node.shortcode}`}>
            <a className='text-decoration-none'>
              <Card className='mb-3'>
                <Card.Img
                  variant='top'
                  src={post.node.display_url}
                  style={{ height: '240px' }}
                />
                <Card.Body>
                  <Card.Title>
                    {post.node.__typename}
                    <br />
                    {post.node.shortcode}
                  </Card.Title>
                  <Card.Text>
                    {post.node.edge_media_to_caption.edges[0] &&
                      post.node.edge_media_to_caption.edges[0].node.text.substr(
                        0,
                        175
                      )}
                    ...
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex'>
                    <div>
                      <FaHeart className='mr-1' />
                      {post.node.edge_media_preview_like.count}{' '}
                    </div>
                    <div className='ml-3'>
                      <FaComment className='mr-1' />
                      {post.node.edge_media_to_comment.count}
                    </div>
                  </div>
                  <small className='text-right'>
                    <Moment unix locale='tr' fromNow>
                      {post.node.taken_at_timestamp}
                    </Moment>
                  </small>
                </Card.Footer>
              </Card>
            </a>
          </Link>
        </Col>
      ))}
      <style jsx>{`
        a:hover {
          color: inherit;
        }
      `}</style>
    </>
  );
};

export default Post;
